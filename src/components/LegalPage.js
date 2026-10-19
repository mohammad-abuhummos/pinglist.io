import { Link } from 'react-router-dom';

export default function LegalPage({ kicker, title, updated, children }) {
  return (
    <main className="legal">
      <p className="eyebrow">{kicker}</p>
      <h1>{title}</h1>
      <p className="legal-updated">Last updated {updated}</p>
      <div className="legal-body">{children}</div>
      <p className="legal-back">
        <Link to="/">Back to PingList.io</Link>
      </p>
    </main>
  );
}
