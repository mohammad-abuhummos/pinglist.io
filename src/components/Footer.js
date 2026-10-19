import { Link } from 'react-router-dom';
import LogoMark from './LogoMark';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link to="/" className="logo footer-logo" aria-label="PingList.io">
          <LogoMark />
          <span className="logo-word">
            PingList<span className="logo-tld">.io</span>
          </span>
        </Link>
        <nav className="footer-links">
          <a href="/#sellers">Sellers</a>
          <a href="/#buyers">Buyers</a>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
        </nav>
        <span>hello@pinglist.io</span>
      </div>
    </footer>
  );
}
