import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { config } from '../config';
import { useAuth } from '../context/AuthContext';
import { gsap, ScrollTrigger } from '../gsapSetup';
import PingList from '../components/PingList';

const MARQUEE = [
  'pinglist.io',
  'CRM',
  'Ping',
  'Post',
  'Follow-ups',
  'Deal rooms',
  'Account timeline',
];

const PROCESS = [
  {
    title: 'List the accounts',
    copy: 'We start with the companies your team actually works, then put the ones that need a person on one list.',
    image: '/images/about-workspace.png',
  },
  {
    title: 'Build the workspace',
    copy: 'pinglist.io is the operating layer: accounts, pipeline, activity, and the automations that keep the list honest.',
    image: '/images/crm-dashboard.png',
  },
  {
    title: 'Connect the stack',
    copy: 'Billing, identity, and the rest of your tools sit behind one login so finance and sales see the same truth.',
    image: '/images/insights-analytics.png',
  },
  {
    title: 'Run the week',
    copy: 'Once the list is live, Ping asks for attention and Post keeps the record — so the next week starts cleaner.',
    image: '/images/studio-build.png',
  },
];

export default function Home() {
  const { user } = useAuth();
  const rootRef = useRef(null);
  const processRef = useRef(null);
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState({ text: '', error: false });

  useLayoutEffect(() => {
    const root = rootRef.current;
    const ctx = gsap.context(() => {
      gsap.from('.hero-photo', { scale: 1.08, duration: 2.2, ease: 'power2.out' });
      gsap.from('.hero-copy-block > *', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.15,
      });
      gsap.from('.hero-visual', {
        y: 24,
        opacity: 0,
        duration: 1,
        delay: 0.25,
        ease: 'power3.out',
      });
      gsap.to('.hero-photo', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      });

      gsap.from('.product-card', {
        scrollTrigger: {
          trigger: '#products',
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
      });

      gsap.from('.price-card', {
        scrollTrigger: {
          trigger: '#pricing',
          start: 'top 75%',
        },
        scale: 0.94,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.to('.marquee-track', {
        xPercent: -50,
        duration: 22,
        ease: 'none',
        repeat: -1,
      });

      const processSection = processRef.current;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const applyStep = (next) => {
        const title = processSection?.querySelector('.process-title');
        const copy = processSection?.querySelector('.process-body');
        const index = processSection?.querySelector('.process-index');
        const steps = processSection?.querySelectorAll('.process-step');
        if (title) title.textContent = PROCESS[next].title;
        if (copy) copy.textContent = PROCESS[next].copy;
        if (index) index.textContent = `0${next + 1}`;
        steps?.forEach((node, i) => node.classList.toggle('is-active', i === next));
      };

      if (processSection && !reduceMotion && process.env.NODE_ENV !== 'test') {
        const panels = processSection.querySelectorAll('.process-panel');
        panels.forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            start: 'top 58%',
            end: 'bottom 42%',
            onEnter: () => applyStep(i),
            onEnterBack: () => applyStep(i),
          });
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  async function onContact(event) {
    event.preventDefault();
    setContactStatus({ text: '', error: false });
    try {
      await api.sendContact(contact);
      setContact({ name: '', email: '', message: '' });
      setContactStatus({ text: 'Received. We will reply shortly.', error: false });
    } catch (err) {
      setContactStatus({
        text: err.message || 'Could not send yet. The backend is still being connected.',
        error: true,
      });
    }
  }

  const crmCta = user ? '/account' : '/register';

  return (
    <div ref={rootRef}>
      <section className="hero">
        <img
          className="hero-photo"
          src="/images/hero-control-room.png"
          alt="Operations room with pinglist.io on the screens"
        />
        <div className="hero-shade" />
        <div className="hero-inner">
          <div className="hero-copy-block">
            <p className="eyebrow">pinglist.io is live</p>
            <h1 className="display">Keep every account on the list.</h1>
            <p className="hero-copy">
              Pipeline, Ping, and Post in one workspace. The list shows who needs you today.
              2,500 USD a month, billed to your login.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-solid" to={crmCta}>
                Start pinglist
              </Link>
              <a className="btn btn-ghost" href="#products">
                See the product
              </a>
            </div>
            <div className="hero-meta">
              <div>
                <strong>$2,500</strong>
                <span>USD / month</span>
              </div>
              <div>
                <strong>Ping list</strong>
                <span>Who needs you today</span>
              </div>
              <div>
                <strong>1 login</strong>
                <span>Your billing, your user</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <PingList />
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={`${item}-${i}`}>{item} ·</span>
          ))}
        </div>
      </div>

      <section className="section" id="about">
        <div className="section-head reveal">
          <p className="kicker">The studio</p>
          <div>
            <h2>Built for teams that lose deals in the quiet.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              pinglist.io is the CRM you can subscribe to today. Accounts, pipeline, and the
              follow-ups that usually die in inboxes live on one list.
            </p>
          </div>
        </div>
        <div className="about-grid">
          <figure className="media-frame reveal">
            <img src="/images/about-workspace.png" alt="pinglist.io workspace" />
          </figure>
          <article className="panel reveal">
            <h3>A product company, not a slide deck.</h3>
            <p className="lede">
              Teams use pinglist.io to keep pipeline, Ping, and Post in one place. You log in
              here, subscribe, and see every invoice against your user — no shared billing inboxes.
            </p>
            <div className="stat-list" style={{ marginTop: 24 }}>
              <div>
                <strong>pinglist.io</strong>
                <span>The workspace · live billing</span>
              </div>
              <div>
                <strong>$2,500</strong>
                <span>Monthly seat for the full workspace</span>
              </div>
              <div>
                <strong>Ping + Post</strong>
                <span>Mentions, nudges, and the timeline</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section" id="products">
        <div className="section-head reveal">
          <p className="kicker">Products</p>
          <h2>One workspace. Ping and Post included.</h2>
        </div>
        <div className="product-grid">
          <article className="panel product-card featured">
            <img className="product-photo" src="/images/crm-dashboard.png" alt="pinglist.io workspace" />
            <div className="product-body">
              <span className="product-tag">Live</span>
              <h3>pinglist.io</h3>
              <p>
                Accounts, contacts, and pipeline — plus Ping for signal and Post for the shared
                record. Subscribe monthly. Manage billing from your login.
              </p>
              <ul>
                <li>Pipeline and deal rooms</li>
                <li>Ping: mentions, nudges, and watches</li>
                <li>Post: timeline notes and decisions</li>
                <li>Per-user login and invoices</li>
              </ul>
              <div style={{ marginTop: 28 }}>
                <Link className="btn btn-solid" to={crmCta}>
                  Subscribe for ${config.crmPriceUsd.toLocaleString()}/mo
                </Link>
              </div>
            </div>
          </article>
          <div className="product-stack">
            <article className="panel product-card">
              <img className="product-photo" src="/images/insights-analytics.png" alt="Ping alerts on pinglist.io" />
              <div className="product-body">
                <span className="product-tag">Included</span>
                <h3>Ping</h3>
                <p>
                  Mentions, stalled-deal nudges, and timed watches that land on the record — not in
                  a forgotten inbox.
                </p>
                <div style={{ marginTop: 20 }}>
                  <Link className="btn btn-ghost" to="/ping">
                    Read about Ping
                  </Link>
                </div>
              </div>
            </article>
            <article className="panel product-card">
              <img className="product-photo" src="/images/studio-build.png" alt="Post timeline on pinglist.io" />
              <div className="product-body">
                <span className="product-tag">Included</span>
                <h3>Post</h3>
                <p>
                  Call recaps, decisions, and stage reasons on a timeline the next owner can trust.
                </p>
                <div style={{ marginTop: 20 }}>
                  <Link className="btn btn-ghost" to="/post">
                    Read about Post
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="modules">
        <div className="section-head reveal">
          <p className="kicker">Ping and Post</p>
          <h2>Signal and memory, on the same record.</h2>
        </div>
        <div className="modules-grid">
          <article className="panel reveal">
            <span className="product-tag">Ping</span>
            <h3>Ask for attention without another inbox.</h3>
            <p className="lede">
              Mention a teammate on a deal. Nudge an owner when a stage goes quiet. Set a watch
              that fires if nobody posted in fourteen days. Ping is tied to a person, a record,
              and a reason — then it can be snoozed, resolved, or turned into a task.
            </p>
            <Link className="btn btn-ghost" to="/ping" style={{ marginTop: 20 }}>
              How Ping works
            </Link>
          </article>
          <article className="panel reveal">
            <span className="product-tag">Post</span>
            <h3>Leave a path the next owner can follow.</h3>
            <p className="lede">
              Call recaps, stage reasons, commitments, and decisions live on the company, contact,
              and deal timeline. Posts are searchable and attributable. When a Ping is resolved,
              the outcome can land as a Post so the workspace keeps one story.
            </p>
            <Link className="btn btn-ghost" to="/post" style={{ marginTop: 20 }}>
              How Post works
            </Link>
          </article>
        </div>
      </section>

      <section className="section process" id="method" ref={processRef}>
        <div className="section-head">
          <p className="kicker">Method</p>
          <h2>How the list gets built.</h2>
        </div>
        <div className="process-layout">
          <div className="process-copy">
            <div className="process-index">01</div>
            <h3 className="process-title">{PROCESS[0].title}</h3>
            <p className="process-body">{PROCESS[0].copy}</p>
            <div className="process-track">
              {PROCESS.map((item, i) => (
                <div key={item.title} className={`process-step${i === 0 ? ' is-active' : ''}`}>
                  <strong>
                    0{i + 1} · {item.title}
                  </strong>
                </div>
              ))}
            </div>
          </div>
          <div className="process-panels">
            {PROCESS.map((item, i) => (
              <article className="process-panel" key={item.title}>
                <img src={item.image} alt="" />
                <p className="process-panel-label">
                  0{i + 1} · {item.title}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="section-head reveal">
          <p className="kicker">Pricing</p>
          <h2>One product. One monthly price.</h2>
        </div>
        <div className="pricing-wrap">
          <figure className="media-frame reveal">
            <img src="/images/pricing-room.png" alt="Quiet room for reviewing CRM billing" />
            <figcaption className="media-caption">
              Billed monthly in USD. Create an account, subscribe, then open Billing to see invoices
              tied to your user. Ping and Post ship with the workspace.
            </figcaption>
          </figure>
          <article className="panel price-card">
            <span className="product-tag">pinglist.io</span>
            <div className="price">
              <b>${config.crmPriceUsd.toLocaleString()}</b>
              <span>/ month</span>
            </div>
            <p className="price-note">USD · monthly · cancel at period end from billing</p>
            <ul className="feature-list">
              <li><span className="dot" /> Full CRM workspace</li>
              <li><span className="dot" /> Ping mentions and nudges</li>
              <li><span className="dot" /> Post timeline on every record</li>
              <li><span className="dot" /> Per-user login and invoices</li>
            </ul>
            <Link className="btn btn-solid" to={crmCta}>
              {user ? 'Go to billing' : 'Create account and subscribe'}
            </Link>
          </article>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="section-head reveal">
          <p className="kicker">Contact</p>
          <h2>Tell us which accounts belong on the list.</h2>
        </div>
        <div className="contact-grid">
          <article className="panel reveal">
            <img className="contact-photo" src="/images/studio-build.png" alt="Studio desk" />
            <h3>Studio inquiries</h3>
            <p className="lede">
              For pinglist.io, Ping, Post, or a custom build, send a note. We reply from the same
              team that ships the product.
            </p>
          </article>
          <form className="panel" onSubmit={onContact}>
            <label className="field">
              <span>Name</span>
              <input
                required
                value={contact.name}
                onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
              />
            </label>
            <label className="field">
              <span>Email</span>
              <input
                required
                type="email"
                value={contact.email}
                onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
              />
            </label>
            <label className="field">
              <span>Message</span>
              <textarea
                required
                value={contact.message}
                onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))}
              />
            </label>
            <p className={`form-status${contactStatus.error ? ' error' : ''}`}>{contactStatus.text}</p>
            <button className="btn btn-solid" type="submit">
              Send
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
