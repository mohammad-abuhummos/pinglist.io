import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Post() {
  const { user } = useAuth();
  const cta = user ? '/account' : '/register';

  return (
    <main className="feature">
      <p className="eyebrow">pinglist.io · module</p>
      <h1>Post</h1>
      <p className="feature-lead">
        Post is the shared memory of the account. Notes, deal updates, and decisions live on the
        timeline so the next person to open the record sees the same story — not a private chat
        that vanished.
      </p>
      <div className="feature-actions">
        <Link className="btn btn-solid" to={cta}>
          Get pinglist with Post
        </Link>
        <Link className="btn btn-ghost" to="/ping">
          See Ping
        </Link>
      </div>

      <img className="feature-hero-img" src="/images/crm-dashboard.png" alt="Post timeline on a customer record" />

      <div className="feature-grid">
        <article className="panel">
          <h2>What Post does</h2>
          <p>
            Every company, contact, and deal has a Post stream. You write what happened, attach the
            context, and the record keeps it. Posts can be a win note, a call recap, a risk, or a
            decision. They are searchable, ordered, and visible to the roles you choose.
          </p>
        </article>
        <article className="panel">
          <h2>What belongs on a Post</h2>
          <ul className="feature-list">
            <li>
              <span className="dot" />
              Call and meeting recaps that the next owner can act on.
            </li>
            <li>
              <span className="dot" />
              Stage changes with a reason, not a silent drag on a board.
            </li>
            <li>
              <span className="dot" />
              Customer commitments and internal decisions, dated and attributable.
            </li>
            <li>
              <span className="dot" />
              Links from Ping: when a nudge is resolved, the outcome can land as a Post.
            </li>
          </ul>
        </article>
      </div>

      <section className="panel feature-block">
        <h2>Ping and Post together</h2>
        <p>
          Ping asks for attention. Post keeps the record. A ping without a post is noise; a post
          without a ping is a diary nobody opens. pinglist.io uses both so operators can move
          work and still leave a path behind them.
        </p>
        <p>
          Post is included in the pinglist.io workspace at 2,500 USD per month. There is no
          separate Post licence.
        </p>
      </section>
    </main>
  );
}
