import { Link } from 'react-router-dom';
import LegalPage from '../components/LegalPage';

export default function Terms() {
  return (
    <LegalPage kicker="Legal" title="Terms and conditions" updated="19 October 2026">
      <p>
        These terms govern your use of pinglist.io, including Ping and Post (together, the
        “Service”). By creating an account or using the Service, you agree to this document.
      </p>

      <h2>1. The Service</h2>
      <p>
        pinglist.io is a paid workspace for pipeline, accounts, and team follow-through. Ping is
        the alerting and mention layer. Post is the shared activity record on people, companies, and
        deals. Custom studio work, if any, is scoped in a separate written agreement.
      </p>
      <p>
        The self-serve plan is billed at 2,500 USD per month to the logged-in user. Prices are
        shown before you confirm payment. Taxes may be added where required by law.
      </p>

      <h2>2. Accounts</h2>
      <p>
        You must provide accurate registration details and keep your password confidential. You are
        responsible for activity under your login. Notify us at hello@pinglist.io if you
        believe the account is compromised. We may refuse, suspend, or close accounts that violate
        these terms or that we reasonably believe put the Service or other customers at risk.
      </p>

      <h2>3. Subscriptions and billing</h2>
      <p>
        Subscriptions renew monthly until you cancel. You can manage billing from your account after
        you sign in. Cancellation takes effect at the end of the current paid period unless the law
        requires otherwise. Fees already paid for that period are not refunded except where we are
        legally required to refund, or where we cancel the Service for a reason that is not your
        breach.
      </p>
      <p>
        Failed payments may pause access until the balance is settled. Receipts and invoices appear
        on your billing page when payment succeeds.
      </p>

      <h2>4. Acceptable use</h2>
      <p>You will not:</p>
      <ul>
        <li>use the Service to break the law, or to store or send unlawful content;</li>
        <li>probe, overload, or interfere with the Service or other customers;</li>
        <li>share login credentials, scrape the product, or reverse engineer it except as allowed by law;</li>
        <li>upload malware, or use Ping or Post to harass, spam, or impersonate others;</li>
        <li>resell the Service without a written partner agreement.</li>
      </ul>

      <h2>5. Your data</h2>
      <p>
        You retain rights in the customer records, Ping messages, and Posts you put in the
        workspace. You grant pinglist.io a limited licence to host, process, and display that
        data solely to run the Service for you. Our Privacy Policy explains how we handle personal
        data.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        The pinglist.io name, Ping, Post, the site, and related marks and software remain
        our property or that of our licensors. We grant you a non-exclusive, non-transferable right
        to use the Service during a paid (or otherwise authorised) term.
      </p>

      <h2>7. Availability</h2>
      <p>
        We aim for a stable Service but do not warrant uninterrupted access. We may change features,
        including Ping and Post, with reasonable notice when a change is material. Planned
        maintenance will be announced when practical.
      </p>

      <h2>8. Liability</h2>
      <p>
        The Service is provided as available. To the fullest extent permitted by law, pinglist.io
        is not liable for indirect, incidental, or consequential loss, or for lost profits, data, or
        goodwill. Our aggregate liability for claims relating to the Service in any twelve-month
        period is limited to the fees you paid us for the Service in that period.
      </p>
      <p>
        Nothing in these terms limits liability that cannot be limited by law, including for fraud
        or death or personal injury caused by negligence.
      </p>

      <h2>9. Termination</h2>
      <p>
        You may stop using the Service and cancel as described in billing. We may suspend or end
        access for unpaid fees or material breach. After termination we may delete workspace data
        after a reasonable retention window, except where we must keep records for law or dispute.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update these terms. The date above will change when we do. Continued use after the
        update means you accept the revised terms. If you do not agree, stop using the Service and
        cancel the subscription.
      </p>

      <h2>11. Contact</h2>
      <p>
        pinglist.io · hello@pinglist.io. Questions about these
        terms, Ping, Post, or billing can use the contact form on the site or that email.
      </p>
      <p>
        See also our <Link to="/privacy">Privacy policy</Link>.
      </p>
    </LegalPage>
  );
}
