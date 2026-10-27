import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PingList from '../components/PingList';
import { gsap, ScrollTrigger } from '../gsapSetup';
import CATALOG from './homeImprovementCatalog';

const PING_ROWS = [
  { name: 'Roofing · Tampa', note: 'Homeowner · ready now', tag: 'Accepted', hot: true },
  { name: 'Solar · Orlando', note: 'ZIP match · cap open', tag: 'Ping', hot: false },
  { name: 'HVAC · Miami', note: 'Outside schedule', tag: 'Skip', hot: false },
  { name: 'Windows · Jacksonville', note: 'Under the max price', tag: 'Eligible', hot: false },
];

const SERVICES = [
  'Roofing',
  'Solar',
  'HVAC',
  'Windows',
  'Plumbing',
  'Gutters',
  'Painting',
  'Bath',
  'Kitchen',
  'Flooring',
  'Siding',
  'Home improvement',
];

const PING_POINTS = [
  { title: 'Partial lead only', copy: 'Service, location, homeowner status, and project type go out. The contact record stays back.' },
  { title: 'Buyer rules', copy: 'Each buyer can require a ZIP, a schedule, a daily cap, and a maximum price.' },
  { title: 'A live response', copy: 'A buyer can accept, bid, or skip before anyone receives the full lead.' },
  { title: 'Nothing delivered yet', copy: 'A ping checks demand. It does not hand the homeowner to a contractor.' },
];

const POST_POINTS = [
  { title: 'The full lead', copy: 'Name, phone, address, and qualification answers go to the buyer you selected.' },
  { title: 'One destination', copy: 'The lead is posted once, to the response that fit, instead of blasted to every buyer.' },
  { title: 'Delivery you can track', copy: 'Acceptance, rejection, and returns stay on the record.' },
  { title: 'Into their system', copy: 'Post into a CRM, a webhook, or an API the buyer already uses.' },
];

const FLOW = [
  'Lead comes in',
  'Ping eligible buyers',
  'Compare price and fit',
  'Choose the best response',
  'Post the full lead',
  'Buyer receives it',
];

const LEAD_STAGES = [
  { id: 'seller', label: 'Seller', note: 'Lead comes in' },
  { id: 'validate', label: 'Validate', note: 'Check the record' },
  { id: 'campaign', label: 'Campaign', note: 'Match the rules' },
  { id: 'buyer', label: 'Buyer', note: 'Deliver the lead' },
  { id: 'paid', label: 'Paid', note: 'Count the money' },
];

export default function HomeImprovement() {
  const location = useLocation();
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || process.env.NODE_ENV === 'test') return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const count = root.querySelector('.lead-count');
        if (count) count.textContent = '$86';
        root.querySelectorAll('.lead-stage').forEach((stage) => stage.classList.add('is-on'));
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.catalog-block').forEach((block) => {
          const title = block.querySelector('h3');
          const line = block.querySelector('.title-draw path');
          const rows = block.querySelectorAll('.spec-row');
          const marks = block.querySelectorAll('.row-draw');
          const length = line ? line.getTotalLength() : 0;

          gsap.set(title, { autoAlpha: 0, y: 22 });
          if (line) gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
          gsap.set(rows, { autoAlpha: 0, y: 14 });
          gsap.set(marks, { scaleY: 0, transformOrigin: 'top center' });

          const reveal = gsap.timeline({
            scrollTrigger: {
              trigger: block,
              start: 'top 84%',
              toggleActions: 'play none none none',
            },
          });
          reveal
            .to(title, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' })
            .to(line, { strokeDashoffset: 0, duration: 0.75, ease: 'power2.inOut' }, '-=0.2')
            .to(marks, { scaleY: 1, duration: 0.35, stagger: 0.045, ease: 'power2.out' }, '-=0.25')
            .to(rows, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.045, ease: 'power2.out' }, '<');
        });

        const stages = gsap.utils.toArray('.lead-stage');
        const token = root.querySelector('.lead-token');
        const lane = root.querySelector('.lead-token-lane');
        const count = root.querySelector('.lead-count');
        const money = { value: 0 };
        const xFor = (index) => () => {
          const stage = stages[index];
          if (!lane || !stage) return 0;
          const laneBox = lane.getBoundingClientRect();
          const stageBox = stage.getBoundingClientRect();
          return stageBox.left + stageBox.width / 2 - laneBox.left - 7;
        };
        const setOn = (index) => {
          stages.forEach((stage, i) => stage.classList.toggle('is-on', i <= index));
        };

        gsap.set(token, { x: xFor(0) });
        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.85,
          scrollTrigger: {
            trigger: '.lead-rail',
            start: 'top 85%',
            toggleActions: 'play pause resume pause',
          },
          onRepeat() {
            money.value = 0;
            if (count) count.textContent = '$0';
            setOn(-1);
          },
        });

        stages.forEach((stage, index) => {
          tl.to(token, { x: xFor(index), duration: index === 0 ? 0.15 : 0.5, ease: 'power2.inOut' });
          tl.call(() => setOn(index));
          tl.fromTo(
            stage,
            { y: 0 },
            { y: -6, duration: 0.16, yoyo: true, repeat: 1, ease: 'power1.out' },
            '<',
          );
        });

        tl.to(
          money,
          {
            value: 86,
            duration: 0.8,
            ease: 'power1.out',
            snap: { value: 1 },
            onUpdate: () => {
              if (count) count.textContent = `$${money.value}`;
            },
          },
          '>',
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const previous = document.title;
    document.title = 'PingList.io — Home improvement for buyers and sellers';
    return () => {
      document.title = previous;
    };
  }, []);

  useEffect(() => {
    const id = location.hash.replace('#', '');
    if (!id) {
      window.scrollTo(0, 0);
      return;
    }
    const node = document.getElementById(id);
    if (node) node.scrollIntoView();
    ScrollTrigger.refresh();
  }, [location.hash]);

  return (
    <div ref={rootRef}>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div>
            <p className="eyebrow">Home improvement</p>
            <h1>Ping, then post, for home service leads.</h1>
            <p className="hero-copy">
              Roofing, solar, HVAC, windows, and the rest of home improvement can check buyer demand
              with a ping, then post the full lead to the one that fits.
            </p>
            <div className="hero-actions">
              <a className="btn btn-solid" href="#features">
                Feature list
              </a>
              <a className="btn btn-ghost" href="#buyers">
                Buyers
              </a>
              <a className="btn btn-ghost" href="#sellers">
                Sellers
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <PingList title="Live ping" meta="1 lead" rows={PING_ROWS} />
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-head">
          <p className="kicker">Services</p>
          <div>
            <h2>Built for home improvement trades.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              A roof replacement and a kitchen remodel are not the same lead as a real estate
              inquiry. This page is only for companies that generate or buy home service leads.
            </p>
          </div>
        </div>
        <ul className="chip-list">
          {SERVICES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section" id="ping">
        <div className="section-head">
          <p className="kicker">Ping</p>
          <div>
            <h2>Check who wants the lead before you send it.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              A ping asks eligible buyers if they can take the job right now. They see enough to
              price it. They do not see the homeowner until you post.
            </p>
          </div>
        </div>
        <div className="card-grid two">
          {PING_POINTS.map((item) => (
            <article className="panel" key={item.title}>
              <h3>{item.title}</h3>
              <p className="lede">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="post">
        <div className="section-head">
          <p className="kicker">Post</p>
          <div>
            <h2>Deliver the full lead to the buyer who fit.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              After the ping, post sends the complete lead to the selected buyer and records what
              happened next.
            </p>
          </div>
        </div>
        <div className="card-grid two">
          {POST_POINTS.map((item) => (
            <article className="panel" key={item.title}>
              <h3>{item.title}</h3>
              <p className="lede">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="flow">
        <div className="section-head">
          <p className="kicker">Ping, then post</p>
          <div>
            <h2>One lead. A check, then a delivery.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Sellers keep more of the lead’s value. Buyers only receive work that matches the
              campaign they set.
            </p>
          </div>
        </div>
        <ol className="flow">
          {FLOW.map((step, index) => (
            <li key={step}>
              <span>0{index + 1}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" id="example">
        <div className="section-head">
          <p className="kicker">Example</p>
          <h2>A roofing lead in Florida.</h2>
        </div>
        <div className="modules-grid">
          <article className="panel">
            <span className="product-tag">Ping</span>
            <h3>What buyers see first</h3>
            <ul className="feature-list">
              <li><span className="dot" /> Roofing</li>
              <li><span className="dot" /> Florida, selected ZIP codes</li>
              <li><span className="dot" /> Homeowner</li>
              <li><span className="dot" /> Replacement, not a repair</li>
              <li><span className="dot" /> Available this afternoon</li>
              <li><span className="dot" /> Under the buyer’s max price</li>
            </ul>
          </article>
          <article className="panel">
            <span className="product-tag">Post</span>
            <h3>What the chosen buyer receives</h3>
            <ul className="feature-list">
              <li><span className="dot" /> Name and phone</li>
              <li><span className="dot" /> Property address</li>
              <li><span className="dot" /> Project notes</li>
              <li><span className="dot" /> Qualification answers</li>
              <li><span className="dot" /> Source of the lead</li>
              <li><span className="dot" /> Delivery into their CRM</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section" id="who">
        <div className="section-head">
          <p className="kicker">Buyers and sellers</p>
          <h2>Sellers send the lead. Buyers decide if they want it.</h2>
        </div>
        <div className="modules-grid">
          <article className="panel">
            <span className="product-tag">Buyers</span>
            <h3>Buy the leads that fit.</h3>
            <p className="lede">
              Contractors and lead buyers set filters, caps, schedules, budgets, and price. They
              only receive home improvement leads that match.
            </p>
            <a className="btn btn-ghost" href="#buyers">
              Buyer features
            </a>
          </article>
          <article className="panel">
            <span className="product-tag">Sellers</span>
            <h3>Send leads and track what sold.</h3>
            <p className="lede">
              Lead generators and suppliers submit leads, map their fields, and see accepted,
              rejected, and paid results in one place.
            </p>
            <a className="btn btn-ghost" href="#sellers">
              Seller features
            </a>
          </article>
        </div>
      </section>

      <section className="section" id="journey">
        <div className="section-head">
          <p className="kicker">One lead</p>
          <div>
            <h2>Seller, validate, campaign, buyer, then the money.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              A home improvement lead arrives from a seller, passes validation, enters a campaign,
              goes to a buyer, and the sale is counted.
            </p>
          </div>
        </div>
        <div className="lead-rail">
          <div className="lead-token-lane" aria-hidden="true">
            <span className="lead-token" />
          </div>
          <ol className="lead-stages">
            {LEAD_STAGES.map((stage) => (
              <li className="lead-stage" key={stage.id}>
                <strong>{stage.label}</strong>
                <span>{stage.note}</span>
                {stage.id === 'paid' ? <b className="lead-count">$0</b> : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="features">
        <div className="section-head">
          <p className="kicker">Feature list</p>
          <div>
            <h2>How a home improvement lead is managed, sold, and delivered.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Distribution, buyers, sellers, campaigns, validation, and billing. Each item below is
              part of the home improvement product.
            </p>
          </div>
        </div>
        <ul className="chip-list catalog-nav">
          {CATALOG.map((group) => (
            <li key={group.id}>
              <a href={`#${group.id}`}>{group.short}</a>
            </li>
          ))}
        </ul>
        {CATALOG.map((group) => (
          <div className="catalog-block" id={group.id} key={group.id}>
            <div className="catalog-title">
              <h3>{group.title}</h3>
              <svg className="title-draw" viewBox="0 0 400 8" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 4 H400" />
              </svg>
            </div>
            <dl className="spec-list">
              {group.items.map(([name, description]) => (
                <div className="spec-row" key={name}>
                  <span className="row-draw" aria-hidden="true" />
                  <dt>{name}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </section>

      <section className="section" id="close">
        <div className="panel close-band">
          <p className="eyebrow">Home improvement only</p>
          <h2>Ping the market. Post the lead.</h2>
          <p className="lede" style={{ marginTop: 16 }}>
            Tell us the trades you run and whether you sell leads, buy them, or both.
          </p>
          <Link className="btn btn-solid" to="/#contact">
            Talk to us
          </Link>
        </div>
      </section>
    </div>
  );
}
