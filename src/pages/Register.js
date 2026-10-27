import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { user, register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  if (user) return <Navigate to="/account" replace />;

  async function onSubmit(event) {
    event.preventDefault();
    setError('');
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setPending(true);
    try {
      await register(form);
    } catch (err) {
      setError(err.message || 'Could not create the account.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img src="/images/crm-dashboard.jpg" alt="CRM dashboard with leads, stages, and owners" />
      </div>
      <div className="auth-panel">
        <form className="auth-card" onSubmit={onSubmit}>
          <p className="eyebrow">Account</p>
          <h1>Create your account.</h1>
          <p>Create an account to keep your team’s leads in one pipeline.</p>
          <label className="field">
            <span>Name</span>
            <input
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </label>
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
              minLength={8}
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
          </label>
          <p className={`form-status${error ? ' error' : ''}`}>{error}</p>
          <button className="btn btn-solid btn-wide" type="submit" disabled={pending}>
            {pending ? 'Creating…' : 'Create account'}
          </button>
          <p className="auth-switch">
            By creating an account you agree to the <Link to="/terms">Terms</Link> and{' '}
            <Link to="/privacy">Privacy policy</Link>.
          </p>
          <p className="auth-switch">
            Already registered? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
