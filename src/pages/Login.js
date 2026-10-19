import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user, login } = useAuth();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const next = new URLSearchParams(location.search).get('next') || '/account';

  if (user) return <Navigate to={next} replace />;

  async function onSubmit(event) {
    event.preventDefault();
    setError('');
    setPending(true);
    try {
      await login(form);
    } catch (err) {
      setError(err.message || 'Could not log in.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img src="/images/about-workspace.png" alt="" />
      </div>
      <div className="auth-panel">
        <form className="auth-card" onSubmit={onSubmit}>
          <p className="eyebrow">Account</p>
          <h1>Log in to billing.</h1>
          <p>Use the same login to subscribe to pinglist.io and review invoices.</p>
          <label className="field">
            <span>Email</span>
            <input
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              required
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
          </label>
          <p className={`form-status${error ? ' error' : ''}`}>{error}</p>
          <button className="btn btn-solid btn-wide" type="submit" disabled={pending}>
            {pending ? 'Signing in…' : 'Log in'}
          </button>
          <p className="auth-switch">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
