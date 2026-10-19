import { useCallback, useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { api } from '../api/client';
import { config } from '../config';
import { useAuth } from '../context/AuthContext';
import { usePaddle } from '../hooks/usePaddle';

function formatMoney(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(value));
}

export default function Account() {
  const { user, ready } = useAuth();
  const [params] = useSearchParams();
  const [subscription, setSubscription] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');
  const [loading, setLoading] = useState(true);

  const refreshBilling = useCallback(async () => {
    setLoadError('');
    try {
      const [subRes, invoiceRes] = await Promise.all([api.getSubscription(), api.getInvoices()]);
      setSubscription(subRes.subscription || null);
      setInvoices(invoiceRes.invoices || []);
    } catch (err) {
      setLoadError(err.message || 'Billing is not available yet.');
    } finally {
      setLoading(false);
    }
  }, []);

  const onCheckoutCompleted = useCallback(() => {
    refreshBilling();
  }, [refreshBilling]);

  const paddle = usePaddle(onCheckoutCompleted);

  useEffect(() => {
    if (user) refreshBilling();
  }, [user, refreshBilling]);

  useEffect(() => {
    if (params.get('checkout') === 'success' && user) {
      refreshBilling();
    }
  }, [params, user, refreshBilling]);

  if (!ready) return null;
  if (!user) return <Navigate to="/login?next=/account" replace />;

  const status = subscription?.status || 'none';
  const isActive = status === 'active' || status === 'trialing';

  async function subscribe() {
    setActionError('');
    try {
      paddle.openCheckout({ email: user.email, userId: user.id });
    } catch (err) {
      setActionError(err.message || 'Checkout could not start.');
    }
  }

  async function openPortal() {
    setActionError('');
    try {
      const data = await api.createPortal();
      if (data.url) window.location.assign(data.url);
    } catch (err) {
      setActionError(err.message || 'Could not open the customer portal.');
    }
  }

  return (
    <main className="account">
      <p className="eyebrow">Your account</p>
      <h1>Billing</h1>
      <p className="account-lead">
        Signed in as {user.name ? `${user.name} · ` : ''}
        {user.email}. Subscriptions are attached to this user only.
      </p>

      {params.get('checkout') === 'success' && (
        <p className="form-status">Checkout finished. Billing will update once payment is confirmed.</p>
      )}

      <div className="billing-grid">
        <article className="panel">
          <span
            className={`status-pill${isActive ? '' : status === 'past_due' ? ' warn' : ' muted'}`}
          >
            {status.replaceAll('_', ' ')}
          </span>
          <h2 style={{ margin: '16px 0 8px', fontFamily: 'var(--font-display)', fontSize: '2rem' }}>
            {config.crmPlanName}
          </h2>
          <p className="lede">
            {formatMoney(config.crmPriceUsd)} per month · billed in USD
          </p>
          {subscription && (
            <ul className="feature-list">
              <li>
                <span className="dot" />
                Period {formatDate(subscription.currentPeriodStart)} –{' '}
                {formatDate(subscription.currentPeriodEnd)}
              </li>
              <li>
                <span className="dot" />
                {subscription.cancelAtPeriodEnd
                  ? 'Cancels at the end of the current period'
                  : 'Renews automatically'}
              </li>
            </ul>
          )}
          {loading && <p className="lede">Loading billing…</p>}
          {loadError && <p className="form-status error">{loadError}</p>}
          {actionError && <p className="form-status error">{actionError}</p>}
          {!paddle.configured && (
            <p className="lede">
              Checkout is not configured on this site yet. Subscribe will be available once billing
              is connected.
            </p>
          )}
          <div className="account-actions">
            {!isActive && (
              <button className="btn btn-solid" type="button" onClick={subscribe}>
                Subscribe · {formatMoney(config.crmPriceUsd)}/mo
              </button>
            )}
            {subscription && (
              <button className="btn btn-ghost" type="button" onClick={openPortal}>
                Manage billing
              </button>
            )}
            <button className="btn btn-ghost" type="button" onClick={refreshBilling}>
              Refresh
            </button>
          </div>
        </article>
        <aside className="panel">
          <h3>Plan</h3>
          <p className="lede" style={{ marginTop: 10 }}>
            pinglist.io includes Ping and Post. One workspace, billed monthly to the logged-in
            user.
          </p>
        </aside>
      </div>

      <article className="panel">
        <h3>Invoices</h3>
        {invoices.length === 0 ? (
          <p className="lede" style={{ marginTop: 12 }}>
            No invoices yet. They appear here after the first successful payment.
          </p>
        ) : (
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{formatDate(invoice.billedAt)}</td>
                  <td>{formatMoney(invoice.amountUsd, invoice.currency || 'USD')}</td>
                  <td>{invoice.status}</td>
                  <td>
                    {invoice.hostedInvoiceUrl ? (
                      <a href={invoice.hostedInvoiceUrl} target="_blank" rel="noreferrer">
                        {invoice.invoiceNumber || 'View'}
                      </a>
                    ) : (
                      invoice.invoiceNumber || '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </article>
    </main>
  );
}
