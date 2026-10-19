import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoMark from './LogoMark';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <Link to="/" className="logo" aria-label="pinglist.io">
        <LogoMark />
        <span className="logo-word">
          pinglist<span className="logo-tld">.io</span>
        </span>
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Close' : 'Menu'}
      </button>
      <nav className="nav-links">
        <a href="/#products">Products</a>
        <NavLink to="/ping">Ping</NavLink>
        <NavLink to="/post">Post</NavLink>
        <a href="/#pricing">Pricing</a>
        <a href="/#contact">Contact</a>
      </nav>
      <div className="nav-cta">
        {user ? (
          <>
            <NavLink to="/account">Billing</NavLink>
            <button className="btn btn-ghost" type="button" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <Link className="btn btn-solid" to="/register">
              Get pinglist
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
