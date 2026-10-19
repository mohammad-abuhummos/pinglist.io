# FuturePathTech backend

Hand this file to the backend agent as the full implementation prompt. The frontend already lives in this repository.

**Frontend repo / site URL:** `https://futurepathtech.dev`  
**Local frontend:** `http://localhost:3000` (Create React App)  
**Expected local backend:** `http://localhost:4000`  
**Stack you must use:** Node.js + PostgreSQL  
**Billing:** Paddle Billing (not Paddle Classic) · FuturePath CRM · **$2,500 USD per month**

You are implementing the FuturePathTech API that this website already calls. Match the routes, status codes, and JSON field names below exactly. Do not invent a parallel contract.

---

## 1. What this product is

FuturePathTech is a tech company site. The self-serve product is **FuturePath CRM**.

A user must:

1. Register and log in.
2. Subscribe to CRM for **2500 USD / month** through **Paddle overlay checkout** (opened by the frontend).
3. Open `/account` while logged in and see **their** subscription and **their** invoices.

Checkout is client-side Paddle.js. Your job is auth, persistence, webhook processing, and read APIs for billing.

---

## 2. Frontend URLs the backend must allow

Configure CORS (and cookie `Domain` / `SameSite` if you use cookies) for:

| Environment | Origin |
|---|---|
| Local | `http://localhost:3000` |
| Production | `https://futurepathtech.dev` |

Also allow `http://127.0.0.1:3000` in development.

The frontend sends:

- `credentials: 'include'`
- `Authorization: Bearer <jwt>` when a token exists in `localStorage`
- `Content-Type: application/json`

Support **both** httpOnly cookie session **and** Bearer JWT. The SPA stores `token` from login/register. Cookie auth is extra hardening, not a replacement for the JSON `token` field.

Production frontend env (already expected by this repo):

```
REACT_APP_API_URL=https://api.futurepathtech.dev
REACT_APP_SITE_URL=https://futurepathtech.dev
REACT_APP_PADDLE_ENV=production
REACT_APP_PADDLE_CLIENT_TOKEN=<paddle client-side token>
REACT_APP_PADDLE_PRICE_ID=<paddle price id for 2500 USD / month>
```

Local frontend (see `.env.example`):

```
REACT_APP_API_URL=http://localhost:4000
REACT_APP_SITE_URL=http://localhost:3000
REACT_APP_PADDLE_ENV=sandbox
```

If `REACT_APP_API_URL` is empty, CRA proxies `/api` to `http://localhost:4000`.

Pick an API host (`https://api.futurepathtech.dev` is the intended production URL) and put it in CORS + frontend env. Tell the frontend owner the final API URL.

---

## 3. Paddle setup you must do

Use **Paddle Billing** (Paddle.js v2 + REST API v1).

In the Paddle dashboard (sandbox first, then live):

1. Create product **FuturePath CRM**.
2. Create a recurring price: **2500.00 USD / month**, interval `month`, quantity 1.
3. Copy the **Price ID** (`pri_...`). Give it to the frontend as `REACT_APP_PADDLE_PRICE_ID`. Store the same value in backend env as `PADDLE_PRICE_ID` and reject webhooks for any other price.
4. Create a **client-side token** for Paddle.js. Frontend env: `REACT_APP_PADDLE_CLIENT_TOKEN`.
5. Create an **API key** for server calls. Backend only.
6. Create a **notification destination** (webhook) pointing at:

   `https://api.futurepathtech.dev/api/webhooks/paddle`  
   Local: `http://localhost:4000/api/webhooks/paddle` (use a tunnel in sandbox).

7. Subscribe at least to:

   - `transaction.completed`
   - `transaction.updated`
   - `subscription.created`
   - `subscription.updated`
   - `subscription.canceled`
   - `subscription.past_due`
   - `subscription.activated`

8. Enable Paddle customer portal (or generate portal links via API). Frontend calls `POST /api/billing/portal` and redirects to `{ url }`.

Frontend checkout payload you will receive on the transaction / subscription:

```json
{
  "items": [{ "priceId": "pri_...", "quantity": 1 }],
  "customer": { "email": "user@example.com" },
  "customData": { "userId": "<uuid from our users table>" }
}
```

**Always bind billing to `customData.userId`**, then fall back to customer email if needed. Never attach a paid subscription to the wrong user.

Verify every webhook with the Paddle signature / secret. Return 400 if invalid. Return 200 quickly after persisting; do not call Paddle from the webhook handler in a way that can loop.

---

## 4. Environment variables (backend)

```
PORT=4000
NODE_ENV=development
DATABASE_URL=postgres://USER:PASS@localhost:5432/futurepathtech
JWT_SECRET=change-me
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
APP_URL=http://localhost:4000

PADDLE_ENV=sandbox
PADDLE_API_KEY=
PADDLE_WEBHOOK_SECRET=
PADDLE_PRICE_ID=
PADDLE_API_BASE=https://sandbox-api.paddle.com
```

Production:

```
FRONTEND_URL=https://futurepathtech.dev
APP_URL=https://api.futurepathtech.dev
PADDLE_ENV=production
PADDLE_API_BASE=https://api.paddle.com
```

Use `PADDLE_API_BASE` so sandbox and live do not get mixed.

---

## 5. PostgreSQL schema

Use UUID primary keys (`gen_random_uuid()`). Add `created_at` / `updated_at` on every table.

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email CITEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  paddle_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  paddle_subscription_id TEXT UNIQUE NOT NULL,
  paddle_customer_id TEXT,
  paddle_price_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN (
    'none', 'trialing', 'active', 'past_due', 'paused', 'canceled'
  )),
  plan_name TEXT NOT NULL DEFAULT 'FuturePath CRM',
  price_usd INTEGER NOT NULL DEFAULT 2500,
  currency TEXT NOT NULL DEFAULT 'USD',
  interval TEXT NOT NULL DEFAULT 'month',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  raw JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  paddle_transaction_id TEXT UNIQUE NOT NULL,
  invoice_number TEXT,
  amount_usd INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL,
  billed_at TIMESTAMPTZ,
  hosted_invoice_url TEXT,
  raw JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE processed_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email CITEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Notes:

- One CRM subscription per user (`subscriptions.user_id` unique). Upsert on webhook.
- Store amounts as integer **USD dollars** for this product (2500), not cents, because the frontend displays `amountUsd` as 2500. If Paddle sends minor units, convert before save.
- `processed_events` makes webhooks idempotent.

---

## 6. Error shape (all failed JSON responses)

```json
{ "message": "Human readable error" }
```

Use these statuses:

| Status | When |
|---|---|
| 400 | Validation failed |
| 401 | Missing/invalid auth |
| 409 | Email already registered |
| 404 | No portal/subscription when required |
| 500 | Unexpected |

Do not send stack traces to the client.

---

## 7. Auth API

Password hashing: Argon2id or bcrypt (cost ≥ 12).  
JWT payload: `{ sub: user.id, email: user.email }`.  
Never return `password_hash`.

User object (every auth response):

```json
{
  "id": "uuid",
  "name": "Ada West",
  "email": "ada@company.com"
}
```

### `POST /api/auth/register`

Body:

```json
{ "name": "Ada West", "email": "ada@company.com", "password": "at-least-8-chars" }
```

Rules: trim name/email, lowercase email, reject empty name, valid email, password min 8 chars, 409 if email taken.

Success `201`:

```json
{
  "user": { "id": "...", "name": "...", "email": "..." },
  "token": "jwt"
}
```

Also set httpOnly cookie `fpt_session` with the same JWT if you implement cookies (`SameSite=Lax`, `Secure` in production, `Path=/`).

### `POST /api/auth/login`

Body:

```json
{ "email": "ada@company.com", "password": "..." }
```

Success `200`: same shape as register (`user` + `token`).  
Failure `401`: `{ "message": "Invalid email or password" }`.

### `POST /api/auth/logout`

Auth optional. Clear cookie. Success `200`: `{ "ok": true }`.

### `GET /api/auth/me`

Requires auth (cookie or Bearer).  
Success `200`: `{ "user": { "id", "name", "email" } }`  
Failure `401`: `{ "message": "Unauthorized" }`.

Auth middleware: accept `Authorization: Bearer`, then cookie.

---

## 8. Billing API (auth required)

### `GET /api/billing/subscription`

Success `200` when the user has a row:

```json
{
  "subscription": {
    "status": "active",
    "planName": "FuturePath CRM",
    "priceUsd": 2500,
    "interval": "month",
    "currency": "USD",
    "currentPeriodStart": "2026-08-17T00:00:00.000Z",
    "currentPeriodEnd": "2026-09-17T00:00:00.000Z",
    "cancelAtPeriodEnd": false,
    "paddleSubscriptionId": "sub_...",
    "paddleCustomerId": "ctm_..."
  }
}
```

If none: `200` with `{ "subscription": null }` (not 404).

Map Paddle statuses into: `trialing` | `active` | `past_due` | `paused` | `canceled`. The frontend treats `active` and `trialing` as subscribed.

### `GET /api/billing/invoices`

Success `200`:

```json
{
  "invoices": [
    {
      "id": "txn_or_uuid",
      "amountUsd": 2500,
      "currency": "USD",
      "status": "paid",
      "billedAt": "2026-08-17T00:00:00.000Z",
      "hostedInvoiceUrl": "https://...",
      "invoiceNumber": "INV-1001"
    }
  ]
}
```

Newest first. Empty list is `{ "invoices": [] }`.  
`id` may be the Paddle transaction id. `hostedInvoiceUrl` can be Paddle receipt / invoice URL; use `null` if missing.

### `POST /api/billing/portal`

If the user has `paddle_customer_id` (or an active/canceled subscription customer id), create a Paddle customer portal session and return:

```json
{ "url": "https://..." }
```

If they have never checked out: `404` `{ "message": "No Paddle customer for this user" }`.

---

## 9. Contact API

### `POST /api/contact`

No auth required. Body:

```json
{
  "name": "Sam",
  "email": "sam@company.com",
  "message": "We want CRM onboarding"
}
```

Validate, store in `contact_messages`, optional email to the team.  
Success `200`: `{ "ok": true }`.

Rate-limit this route.

---

## 10. Webhook API

### `POST /api/webhooks/paddle`

Raw body needed for signature verification. Do not parse JSON before verifying.

On success, upsert:

1. `users.paddle_customer_id` from the Paddle customer id when `customData.userId` or email matches.
2. `subscriptions` from subscription events (status, period dates, cancel flag, price id).
3. `invoices` from completed/paid transactions for the CRM price. `amountUsd` must be 2500 for a full period (or the actual captured USD amount if Paddle prorates — still integer dollars).

Ignore events for other products/prices.

If `userId` is missing, look up `users.email` from the Paddle customer email. If still unknown, log and return 200 so Paddle does not retry forever — but alert, because checkout should always send `userId`.

---

## 11. Suggested Node.js layout

```
src/
  index.js
  app.js
  config.js
  db.js
  middleware/auth.js
  middleware/error.js
  routes/auth.js
  routes/billing.js
  routes/contact.js
  routes/webhooks.js
  services/paddle.js
  services/billing.js
```

Recommended libraries: `express`, `pg` (or Prisma/Knex), `helmet`, `cors`, `cookie-parser`, `jsonwebtoken`, `argon2` or `bcrypt`, `zod` or `joi`, Paddle Node SDK if you want, `express.raw` only on the webhook route.

CORS:

```js
origin: [process.env.FRONTEND_URL, 'http://localhost:3000', 'https://futurepathtech.dev']
credentials: true
```

Health check: `GET /health` → `{ "ok": true }`.

---

## 12. Security

- Helmet, JSON body limit ~200kb except webhook.
- Parameterized SQL only.
- Rate-limit `/api/auth/login`, `/api/auth/register`, `/api/contact`.
- Never log passwords, JWT secrets, or raw card data (Paddle does not send PAN).
- Restrict webhook route to verified signatures.
- Do not expose Paddle API keys to the frontend.

---

## 13. How the frontend uses you (do not break this)

| User action | Frontend call |
|---|---|
| Register | `POST /api/auth/register` then store `token`, set `user` |
| Login | `POST /api/auth/login` |
| App load | `GET /api/auth/me` |
| Logout | `POST /api/auth/logout` and drop token |
| Account page | `GET /api/billing/subscription` and `GET /api/billing/invoices` |
| Subscribe | Paddle.js overlay with `customData.userId` and `customer.email` |
| After checkout | reload billing (`?checkout=success`) |
| Manage billing | `POST /api/billing/portal` then redirect to `url` |
| Contact form | `POST /api/contact` |

Source of truth in this repo:

- `src/api/client.js`
- `src/hooks/usePaddle.js`
- `src/pages/Account.js`
- `src/config.js`

---

## 14. Acceptance tests

1. Register on `http://localhost:3000/register` → lands on `/account`.
2. Refresh the page → still logged in (`GET /api/auth/me`).
3. Log out, log in → same user.
4. Duplicate email → 409 `{ "message": "..." }`.
5. Sandbox Paddle checkout for $2,500 / month with `customData.userId`.
6. Webhook arrives → `/account` shows `active` (or `trialing`) and period dates.
7. Invoices table shows the paid transaction.
8. `Manage billing` opens Paddle portal for that customer only.
9. A second user cannot see the first user’s subscription or invoices.
10. Contact form inserts a row and returns `{ "ok": true }`.
11. Invalid webhook signature → 400, database unchanged.
12. CORS from `http://localhost:3000` and `https://futurepathtech.dev` works with credentials.

---

## 15. Deliverables

- Running Node.js API on port 4000 locally
- PostgreSQL migrations for the schema above
- `.env.example` for the backend repo
- Paddle sandbox webhook documented
- README with: API URL, how to run, and the Price ID the frontend must set
- Production CORS locked to `https://futurepathtech.dev`

When you are done, send back:

1. API base URL (local and production)
2. `PADDLE_PRICE_ID`
3. Confirmation that webhook path is `/api/webhooks/paddle`
4. Any extra env the frontend still needs
