import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Ping() {
  const { user } = useAuth();
  const cta = user ? '/account' : '/register';

  return (
    <main className="feature">
      <p className="eyebrow">pinglist.io · module</p>
      <h1>Ping</h1>
      <p className="feature-lead">
        Ping is how the workspace taps the right person at the right moment — a mention, a stalled
        deal, a follow-up that was due yesterday. Direct signal. Not another inbox to ignore.
      </p>
      <div className="feature-actions">
        <Link className="btn btn-solid" to={cta}>
          Get pinglist with Ping
        </Link>
        <Link className="btn btn-ghost" to="/post">
          See Post
        </Link>
      </div>

      <img className="feature-hero-img" src="/images/insights-analytics.png" alt="Ping alerts in the CRM workspace" />

      <div className="feature-grid">
        <article className="panel">
          <h2>What Ping does</h2>
          <p>
            Ping sits on the same records as your pipeline. You can mention a teammate on a deal,
            send a timed nudge when a stage has gone quiet, or raise a watch when an account needs
            an owner today. The ping lands in the product, on the record, with a link back to the
            work — not a thread that dies in email.
          </p>
        </article>
        <article className="panel">
          <h2>When teams use it</h2>
          <ul className="feature-list">
            <li>
              <span className="dot" />
              A deal sits in proposal for too long — Ping the owner with the last activity attached.
            </li>
            <li>
              <span className="dot" />
              Handoff from sales to onboarding — mention the next owner on the account timeline.
            </li>
            <li>
              <span className="dot" />
              SLA risk — a scheduled ping if a ticket or follow-up is still open at a set hour.
            </li>
            <li>
              <span className="dot" />
              Quiet accounts — a weekly ping list of logos with no Post in fourteen days.
            </li>
          </ul>
        </article>
      </div>

      <section className="panel feature-block">
        <h2>How Ping stays honest</h2>
        <p>
          Pings are tied to a person, a record, and a reason. They are not a blast channel. Volume
          is visible to the workspace so teams do not train each other to mute the product. You can
          snooze, resolve, or convert a ping into a task without leaving the deal room.
        </p>
        <p>
          Ping is included in the pinglist.io workspace at 2,500 USD per month. There is no
          separate Ping licence.
        </p>
      </section>
    </main>
  );
}
