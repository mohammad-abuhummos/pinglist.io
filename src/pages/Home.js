import { useLayoutEffect, useRef, useState } from 'react';
import { api } from '../api/client';
import { gsap } from '../gsapSetup';
import PingList from '../components/PingList';

const MARQUEE = [
  'Roofing',
  'Solar',
  'HVAC',
  'Windows',
  'Plumbing',
  'Debt settlement',
  'Call centers',
  'Agencies',
];

const FLOW = [
  'Lead generated',
  'PingList.io',
  'Find eligible buyers',
  'Compare buyer demand',
  'Select best opportunity',
  'Deliver lead',
  'Get paid',
];

const SELLER_POINTS = [
  {
    title: 'Increase revenue per lead',
    copy: 'Give your traffic access to multiple buyers instead of relying on a single buyer.',
  },
  {
    title: 'Reduce unsold leads',
    copy: 'If one buyer is unavailable, PingList.io can look for another qualified buyer.',
  },
  {
    title: 'Create buyer competition',
    copy: 'Multiple eligible buyers can compete for the same opportunity.',
  },
  {
    title: 'Scale without manual routing',
    copy: 'Automate lead distribution instead of managing buyer routing manually.',
  },
];

const PROBLEMS = [
  'Sent to buyers who are not available',
  'Rejected because of targeting issues',
  'Lost when a buyer reaches their daily limit',
  'Sold for less than their potential value',
  'Sent to the wrong buyer',
  'Left unused when demand changes',
  'Difficult to track or dispute',
];

const BUYER_FILTERS = [
  'Location',
  'Service',
  'Project type',
  'Homeowner status',
  'Lead quality',
  'Qualification answers',
  'Budget',
  'Schedule',
  'Campaign requirements',
];

const HOME_SERVICES = [
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

const AUDIENCES = [
  { title: 'Lead generators', copy: 'Monetize more of your traffic.' },
  { title: 'Lead aggregators', copy: 'Manage multiple buyers and maximize lead value.' },
  { title: 'Contractors', copy: 'Purchase qualified leads in your service areas.' },
  { title: 'Call centers', copy: 'Control lead volume and campaign budgets.' },
  { title: 'Marketing agencies', copy: 'Manage lead buying across multiple clients.' },
  { title: 'CRM and lead platforms', copy: 'Connect supply and demand through one marketplace.' },
  { title: 'Enterprise lead networks', copy: 'Manage thousands of campaigns, buyers, and sellers from one platform.' },
];

const WHY = [
  { title: 'More revenue', copy: 'Give every lead more opportunities to be sold.' },
  { title: 'More buyers', copy: 'Connect your supply with multiple qualified buyers.' },
  { title: 'More control', copy: 'Control targeting, pricing, volume, and budgets.' },
  { title: 'Less waste', copy: 'Reduce leads that are lost because a buyer is unavailable.' },
  { title: 'Better transparency', copy: 'Track every lead from generation to delivery.' },
  { title: 'Faster growth', copy: 'Scale your lead operation without scaling manual work.' },
];

export default function Home() {
  const rootRef = useRef(null);
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState({ text: '', error: false });

  useLayoutEffect(() => {
    const root = rootRef.current;
    const ctx = gsap.context(() => {
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
      gsap.to('.marquee-track', {
        xPercent: -50,
        duration: 22,
        ease: 'none',
        repeat: -1,
      });
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

  return (
    <div ref={rootRef}>
      <section className="hero">
        <div className="hero-shade" />
        <div className="hero-inner">
          <div className="hero-copy-block">
            <p className="eyebrow">PingList.io</p>
            <h1 className="display">Turn every lead into more revenue.</h1>
            <p className="hero-copy">
              PingList.io is a real-time lead marketplace built to connect lead sellers with the
              right buyers at the right price.
            </p>
            <div className="hero-actions">
              <a className="btn btn-solid" href="#contact">
                Talk to us
              </a>
              <a className="btn btn-ghost" href="#marketplace">
                See the marketplace
              </a>
            </div>
            <div className="hero-meta">
              <div>
                <strong>More buyers</strong>
                <span>Qualified demand on every lead</span>
              </div>
              <div>
                <strong>More competition</strong>
                <span>Eligible buyers bid for the same lead</span>
              </div>
              <div>
                <strong>More revenue</strong>
                <span>Sell each lead for more</span>
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

      <section className="section" id="intro">
        <div className="section-head reveal">
          <p className="kicker">The marketplace</p>
          <div>
            <h2>Monetize more traffic. Increase lead value. Reduce waste.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Whether you are generating thousands of leads, buying leads for a sales operation, or
              running an agency or call center, PingList.io helps you monetize more traffic,
              increase lead value, reduce waste, and scale your lead business.
            </p>
            <p className="lede" style={{ marginTop: 16 }}>
              Instead of sending every lead to the same buyer, PingList.io creates a competitive
              marketplace where qualified buyers compete for available leads.
            </p>
            <p className="pull">More buyers. More competition. More revenue.</p>
          </div>
        </div>
      </section>

      <section className="section" id="problem">
        <div className="section-head reveal">
          <p className="kicker">The problem</p>
          <div>
            <h2>Too many leads never reach their value.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Every day, businesses spend thousands of dollars generating leads. Traditional lead
              routing does not solve what happens next. If one buyer cannot take the lead, the
              opportunity can disappear.
            </p>
          </div>
        </div>
        <div className="card-grid reveal">
          {PROBLEMS.map((item) => (
            <article className="panel mini-card" key={item}>
              <p>{item}</p>
            </article>
          ))}
        </div>
        <p className="pull reveal">PingList.io changes the way leads are bought and sold.</p>
      </section>

      <section className="section" id="advantage">
        <div className="section-head reveal">
          <p className="kicker">The PingList.io advantage</p>
          <h2>Sell every lead for its maximum potential.</h2>
        </div>
        <div className="modules-grid">
          <article className="panel reveal">
            <p className="lede">
              PingList.io gives your leads access to a marketplace of qualified buyers. When a lead
              enters the platform, PingList.io evaluates available buyers and identifies the buyers
              that are eligible and ready to purchase.
            </p>
            <p className="pull">Your lead goes where it has the highest commercial value.</p>
          </article>
          <article className="panel reveal">
            <p className="kicker">Instead of asking</p>
            <blockquote className="quote">Which buyer should receive this lead?</blockquote>
            <p className="kicker" style={{ marginTop: 22 }}>
              PingList.io asks
            </p>
            <blockquote className="quote">
              Which qualified buyer will pay the most for this lead right now?
            </blockquote>
          </article>
        </div>
      </section>

      <section className="section" id="sellers">
        <div className="section-head reveal">
          <p className="kicker">Built for lead sellers</p>
          <div>
            <h2>Turn traffic into a revenue machine.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              If you generate leads through Google, Meta, native advertising, organic traffic,
              affiliate networks, call centers, websites, landing pages, lead forms, or aggregators,
              PingList.io helps you monetize that traffic more efficiently.
            </p>
          </div>
        </div>
        <div className="card-grid two">
          {SELLER_POINTS.map((item) => (
            <article className="panel reveal" key={item.title}>
              <h3>{item.title}</h3>
              <p className="lede">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="buyers">
        <div className="section-head reveal">
          <p className="kicker">Built for lead buyers</p>
          <div>
            <h2>Get more of the leads you actually want.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              PingList.io helps contractors, agencies, call centers, and sales organizations control
              exactly what they purchase. You control where, when, and how much you buy.
            </p>
          </div>
        </div>
        <ul className="chip-list reveal">
          {BUYER_FILTERS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section" id="fit">
        <div className="section-head reveal">
          <p className="kicker">Campaign fit</p>
          <h2>Stop buying leads that do not fit.</h2>
        </div>
        <div className="modules-grid">
          <article className="panel reveal">
            <span className="product-tag">Example</span>
            <h3>Roofing campaign</h3>
            <ul className="feature-list">
              <li><span className="dot" /> Florida</li>
              <li><span className="dot" /> Selected ZIP codes</li>
              <li><span className="dot" /> Homeowners only</li>
              <li><span className="dot" /> Specific project types</li>
              <li><span className="dot" /> A maximum lead price</li>
              <li><span className="dot" /> 50 leads per day</li>
            </ul>
          </article>
          <article className="panel reveal">
            <h3>You buy what fits your business.</h3>
            <p className="lede">
              Your campaign can be configured around your exact business requirements. PingList.io
              automatically looks for leads that match those requirements.
            </p>
            <p className="pull">You do not have to buy everything.</p>
          </article>
        </div>
      </section>

      <section className="section" id="industries">
        <div className="section-head reveal">
          <p className="kicker">Verticals</p>
          <h2>One platform. Multiple industries.</h2>
        </div>
        <div className="modules-grid">
          <article className="panel reveal">
            <h3>Home services</h3>
            <ul className="chip-list">
              {HOME_SERVICES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="panel reveal">
            <h3>Financial services</h3>
            <ul className="feature-list">
              <li><span className="dot" /> Debt settlement</li>
              <li><span className="dot" /> Financial services</li>
              <li><span className="dot" /> Other qualified financial lead programs</li>
            </ul>
            <p className="lede" style={{ marginTop: 18 }}>
              New verticals can be added as your business grows. PingList.io is designed for
              high-volume lead businesses across multiple verticals.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="marketplace">
        <div className="section-head reveal">
          <p className="kicker">Real-time lead marketplace</p>
          <div>
            <h2>Supply meets demand instantly.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              PingList.io creates a marketplace where lead supply and buyer demand meet in real
              time. This happens automatically, so your business can handle large volumes without
              manually deciding where every lead should go.
            </p>
          </div>
        </div>
        <ol className="flow reveal">
          {FLOW.map((step, index) => (
            <li key={step}>
              <span>0{index + 1}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" id="competition">
        <div className="section-head reveal">
          <p className="kicker">Demand</p>
          <h2>More buyers means more opportunity.</h2>
        </div>
        <div className="modules-grid">
          <article className="panel reveal">
            <p className="lede">
              For lead sellers, the value of PingList.io comes from having access to multiple
              potential buyers. Instead of depending on one buyer, Buyer A through Buyer E can all
              represent potential demand for the same lead.
            </p>
            <ul className="buyer-stack">
              {['Buyer A', 'Buyer B', 'Buyer C', 'Buyer D', 'Buyer E'].map((buyer) => (
                <li key={buyer}>{buyer}</li>
              ))}
            </ul>
          </article>
          <article className="panel reveal">
            <p className="lede">
              If Buyer A is unavailable, another qualified buyer may still be able to purchase the
              lead.
            </p>
            <p className="pull">Lost leads become lost revenue.</p>
            <p className="pull">More opportunities become more sales.</p>
          </article>
        </div>
      </section>

      <section className="section" id="control">
        <div className="section-head reveal">
          <p className="kicker">Buyer control</p>
          <h2>Complete control over every campaign.</h2>
        </div>
        <div className="card-grid two">
          <article className="panel reveal">
            <h3>Geography</h3>
            <p className="lede">Target states, counties, cities, ZIP codes, or a ZIP radius.</p>
          </article>
          <article className="panel reveal">
            <h3>Volume</h3>
            <p className="lede">Set daily lead limits, monthly limits, and spending limits.</p>
          </article>
          <article className="panel reveal">
            <h3>Schedule</h3>
            <p className="lede">
              Run campaigns only when your sales team is available. For example, Monday through
              Friday, 8:00 AM to 5:00 PM.
            </p>
          </article>
          <article className="panel reveal">
            <h3>Budget</h3>
            <p className="lede">Control how much you spend without constantly monitoring the campaign.</p>
          </article>
        </div>
      </section>

      <section className="section" id="wallet">
        <div className="section-head reveal">
          <p className="kicker">Prepaid wallet</p>
          <h2>Spend with confidence.</h2>
        </div>
        <div className="modules-grid">
          <article className="panel reveal">
            <p className="lede">
              PingList.io’s prepaid wallet gives buyers control over their lead spending. Buyers
              fund their account and use their available balance to purchase leads. When the balance
              or campaign budget reaches its limit, lead delivery can automatically stop.
            </p>
          </article>
          <article className="panel reveal">
            <ul className="feature-list">
              <li><span className="dot" /> No unexpected invoices</li>
              <li><span className="dot" /> Better spending control</li>
              <li><span className="dot" /> Predictable lead budgets</li>
              <li><span className="dot" /> Automatic campaign protection</li>
              <li><span className="dot" /> Clear transaction history</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section" id="tracking">
        <div className="section-head reveal">
          <p className="kicker">Transparency</p>
          <h2>Know where your money is going.</h2>
        </div>
        <div className="modules-grid">
          <article className="panel reveal">
            <h3>Buyers can see</h3>
            <ul className="feature-list">
              <li><span className="dot" /> Leads purchased and lead price</li>
              <li><span className="dot" /> Campaign and source</li>
              <li><span className="dot" /> Acceptance, rejection, and returns</li>
              <li><span className="dot" /> Total spend</li>
            </ul>
          </article>
          <article className="panel reveal">
            <h3>Sellers can see</h3>
            <ul className="feature-list">
              <li><span className="dot" /> Leads generated and leads sold</li>
              <li><span className="dot" /> Buyer and revenue</li>
              <li><span className="dot" /> Acceptance and returns</li>
              <li><span className="dot" /> Performance by source</li>
            </ul>
          </article>
        </div>
        <p className="pull reveal">No guessing. No spreadsheets. No black box.</p>
      </section>

      <section className="section" id="quality">
        <div className="section-head reveal">
          <p className="kicker">Lead quality</p>
          <div>
            <h2>Qualified leads, not just lead volume.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              More leads do not always mean more revenue. PingList.io helps businesses focus on
              qualified leads. The platform can help identify duplicate leads, invalid information,
              out-of-area leads, suppressed contacts, unqualified opportunities, and buyer-specific
              qualification requirements. This protects both sides of the marketplace.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="connect">
        <div className="section-head reveal">
          <p className="kicker">CRM connectivity</p>
          <div>
            <h2>Leads land in the systems you already use.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Already using a CRM? PingList.io can connect your lead operation with your existing
              systems, so leads move from the marketplace into the tools your sales team already
              uses.
            </p>
          </div>
        </div>
        <ul className="chip-list reveal">
          {[
            'LeadPerfection',
            'LeadsPedia',
            'Custom CRMs',
            'REST APIs',
            'Webhooks',
            'JSON and XML systems',
            'Internal sales platforms',
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section" id="scale">
        <div className="section-head reveal">
          <p className="kicker">Scale</p>
          <div>
            <h2>Built for high-volume lead businesses.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Whether you are selling 100 leads per month or 100,000+, PingList.io is designed to
              help you scale. Manage multiple sellers, buyers, campaigns, industries, traffic
              sources, and pricing models from one centralized platform.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="network">
        <div className="section-head reveal">
          <p className="kicker">The network</p>
          <div>
            <h2>Turn your lead network into a marketplace.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              The biggest opportunity is not simply generating more leads. It is creating a better
              marketplace around the leads you already generate.
            </p>
          </div>
        </div>
        <ol className="flow reveal">
          {[
            'Publishers generate demand',
            'PingList.io finds the opportunity',
            'Buyers compete for qualified leads',
            'Leads are delivered automatically',
            'Everyone gets measurable results',
          ].map((step, index) => (
            <li key={step}>
              <span>0{index + 1}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" id="who">
        <div className="section-head reveal">
          <p className="kicker">Who it is for</p>
          <h2>Who PingList.io is for.</h2>
        </div>
        <div className="card-grid">
          {AUDIENCES.map((item) => (
            <article className="panel reveal" key={item.title}>
              <h3>{item.title}</h3>
              <p className="lede">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="why">
        <div className="section-head reveal">
          <p className="kicker">Why PingList.io</p>
          <h2>More from every lead you already pay for.</h2>
        </div>
        <div className="card-grid">
          {WHY.map((item) => (
            <article className="panel reveal" key={item.title}>
              <h3>{item.title}</h3>
              <p className="lede">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="close">
        <div className="panel close-band reveal">
          <p className="eyebrow">Your leads are worth more</p>
          <h2>Are you getting the maximum value from every lead?</h2>
          <p className="lede" style={{ marginTop: 16 }}>
            You already spend money generating leads. PingList.io helps turn your lead operation
            into a competitive, automated marketplace where buyers and sellers can transact in real
            time.
          </p>
          <div className="close-lines">
            <span>Generate more.</span>
            <span>Sell smarter.</span>
            <span>Waste less.</span>
            <span>Grow faster.</span>
          </div>
          <p className="pull">PingList.io. The marketplace where leads meet buyers.</p>
          <a className="btn btn-solid" href="#contact">
            Talk to us
          </a>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="section-head reveal">
          <p className="kicker">Contact</p>
          <h2>Tell us about your lead operation.</h2>
        </div>
        <div className="contact-grid">
          <article className="panel reveal">
            <h3>Sellers and buyers</h3>
            <p className="lede">
              Selling leads, buying leads, or connecting a CRM — send a note. We reply from the
              team that runs PingList.io.
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
