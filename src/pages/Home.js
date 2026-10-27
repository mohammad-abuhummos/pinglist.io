import { useLayoutEffect, useRef, useState } from 'react';
import { api } from '../api/client';
import { gsap } from '../gsapSetup';
import PingList from '../components/PingList';

const MARQUEE = [
  'Real estate',
  'Insurance',
  'Professional services',
  'Healthcare',
  'Education',
  'Automotive',
  'Retail',
  'Agencies',
];

const FLOW = [
  'Lead comes in',
  'PingList.io',
  'Assign an owner',
  'Qualify it',
  'Follow up',
  'Update the stage',
  'Close or nurture',
];

const TEAM_POINTS = [
  {
    title: 'One record for every lead',
    copy: 'A form, a call, a referral, and a walk-in all land on the same list.',
  },
  {
    title: 'The same workflow everywhere',
    copy: 'Real estate, services, clinics, and sales teams use one pipeline. The fields are yours.',
  },
  {
    title: 'A clear owner',
    copy: 'Every lead belongs to someone on your team, so it does not sit in a shared inbox.',
  },
  {
    title: 'Follow-up you can see',
    copy: 'The next step stays on the record, instead of in someone’s memory.',
  },
];

const PROBLEMS = [
  'Sitting in a shared inbox',
  'Never followed up',
  'Assigned to the wrong person',
  'Copied across spreadsheets',
  'Missing the context your team needs',
  'Stuck with no next step',
  'Hard to see what is still open',
];

const FIELDS = [
  'Source',
  'Location',
  'Interest',
  'Stage',
  'Owner',
  'Priority',
  'Budget',
  'Timeline',
  'Notes',
];

const INDUSTRIES = [
  'Real estate',
  'Insurance',
  'Professional services',
  'Healthcare',
  'Education',
  'Automotive',
  'Retail',
  'Hospitality',
  'Agencies',
  'Local services',
  'B2B sales',
  'Clinics',
];

const STAGES = ['New', 'Contacted', 'Qualified', 'Working', 'Won'];

const AUDIENCES = [
  { title: 'Real estate teams', copy: 'Keep every inquiry with an agent and a next step.' },
  { title: 'Service businesses', copy: 'Track requests from the first call to the finished job.' },
  { title: 'Agencies', copy: 'Run client work from one shared pipeline.' },
  { title: 'Sales teams', copy: 'See who owns each conversation and where it stands.' },
  { title: 'Clinics and practices', copy: 'Follow new inquiries without losing them in email.' },
  { title: 'Local businesses', copy: 'Replace the spreadsheet with a list the whole team can use.' },
  { title: 'Multi-location companies', copy: 'One pipeline across offices, teams, and industries.' },
];

const WHY = [
  { title: 'Any industry', copy: 'The CRM does not assume what a lead means in your business.' },
  { title: 'One pipeline', copy: 'New, contacted, qualified, working, won — or the stages you choose.' },
  { title: 'Clear ownership', copy: 'Each lead has a person responsible for the next step.' },
  { title: 'Nothing lost', copy: 'If someone is away, the lead is still on the team’s list.' },
  { title: 'A full history', copy: 'Notes and stage changes stay on the record.' },
  { title: 'Room to grow', copy: 'Start with one team and add offices without a new system.' },
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
            <h1 className="display">One CRM for every kind of lead.</h1>
            <p className="hero-copy">
              PingList.io helps any business capture leads, assign them, and follow through. A
              property inquiry, a service request, and a sales conversation all live in the same
              pipeline.
            </p>
            <div className="hero-actions">
              <a className="btn btn-solid" href="#contact">
                Talk to us
              </a>
              <a className="btn btn-ghost" href="#workflow">
                See the pipeline
              </a>
            </div>
            <div className="hero-meta">
              <div>
                <strong>Any business</strong>
                <span>Not tied to one industry</span>
              </div>
              <div>
                <strong>One pipeline</strong>
                <span>The same stages for every lead</span>
              </div>
              <div>
                <strong>Clear follow-up</strong>
                <span>An owner and a next step</span>
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
          <p className="kicker">The CRM</p>
          <div>
            <h2>Built for the way your business actually works.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              A lead is not the same in every industry. In real estate it is an inquiry. In a
              service business it is a request. In sales it is a conversation. PingList.io keeps that
              work inside your own team.
            </p>
            <p className="lede" style={{ marginTop: 16 }}>
              Your team keeps the relationship. The CRM gives each lead a record, an owner, and a
              stage, so the next step is visible to everyone who needs it.
            </p>
            <p className="pull">Capture it. Own it. Follow through.</p>
          </div>
        </div>
        <figure className="media-frame reveal">
          <img
            src="/images/marketplace-flow.jpg"
            alt="Leads moving through one shared pipeline"
          />
        </figure>
      </section>

      <section className="section" id="problem">
        <div className="section-head reveal">
          <p className="kicker">The problem</p>
          <div>
            <h2>Leads get lost when they have no home.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Teams bring people in through the website, the phone, and referrals, then leave the
              next step in inboxes, chats, and spreadsheets. The lead is still yours. It is just
              hard to find.
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
        <p className="pull reveal">PingList.io keeps every lead in one place.</p>
      </section>

      <section className="section" id="advantage">
        <div className="section-head reveal">
          <p className="kicker">The PingList.io advantage</p>
          <h2>The same pipeline, whatever you sell.</h2>
        </div>
        <div className="modules-grid">
          <article className="panel reveal">
            <p className="lede">
              When a lead comes in, PingList.io gives it a record, an owner, and a stage. Your team
              sees what it is, who is working it, and what should happen next. Nothing is sold off
              to another company.
            </p>
            <p className="pull">The lead stays with your business.</p>
          </article>
          <article className="panel reveal">
            <p className="kicker">Instead of asking</p>
            <blockquote className="quote">Which inbox is this sitting in?</blockquote>
            <p className="kicker" style={{ marginTop: 22 }}>
              PingList.io asks
            </p>
            <blockquote className="quote">Who owns this lead, and what is the next step?</blockquote>
          </article>
        </div>
      </section>

      <section className="section" id="pipeline">
        <div className="section-head reveal">
          <p className="kicker">For any team</p>
          <div>
            <h2>Work the lead. Do not resell it.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Forms, calls, ads, referrals, and walk-ins can land in the same list. Each one is handed
              to someone on your team.
            </p>
          </div>
        </div>
        <div className="card-grid two">
          {TEAM_POINTS.map((item) => (
            <article className="panel reveal" key={item.title}>
              <h3>{item.title}</h3>
              <p className="lede">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="follow-up">
        <div className="section-head reveal">
          <p className="kicker">Your fields</p>
          <div>
            <h2>Track what matters to your business.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              A real estate team can note the neighborhood. A clinic can note the appointment. A
              sales team can note the product. The pipeline stays the same.
            </p>
          </div>
        </div>
        <ul className="chip-list reveal">
          {FIELDS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section" id="fit">
        <div className="section-head reveal">
          <p className="kicker">How a record looks</p>
          <h2>Shape the pipeline around the work.</h2>
        </div>
        <div className="modules-grid">
          <article className="panel reveal">
            <span className="product-tag">Example</span>
            <h3>Real estate inquiry</h3>
            <ul className="feature-list">
              <li><span className="dot" /> Website form</li>
              <li><span className="dot" /> City or neighborhood</li>
              <li><span className="dot" /> What they asked about</li>
              <li><span className="dot" /> Assigned to one agent</li>
              <li><span className="dot" /> Stage: new</li>
              <li><span className="dot" /> Follow up today</li>
            </ul>
          </article>
          <article className="panel reveal">
            <h3>The same idea in any industry.</h3>
            <p className="lede">
              Swap the neighborhood for a service area, a course, or a product line. The relationship
              stays in one record your team can open.
            </p>
            <p className="pull">The fields change. The workflow does not.</p>
          </article>
        </div>
      </section>

      <section className="section" id="industries">
        <div className="section-head reveal">
          <p className="kicker">Industries</p>
          <h2>One platform. Any industry.</h2>
        </div>
        <div className="modules-grid">
          <article className="panel reveal">
            <h3>Use it wherever leads come in</h3>
            <ul className="chip-list">
              {INDUSTRIES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="panel reveal">
            <h3>A lead is just someone to follow up with</h3>
            <p className="lede" style={{ marginTop: 18 }}>
              It might be a property inquiry, a new patient, a project request, or a product demo.
              PingList.io treats each of those as a lead your team can own and follow up.
            </p>
            <p className="pull">Your industry. Your words. One list.</p>
          </article>
        </div>
      </section>

      <section className="section" id="workflow">
        <div className="section-head reveal">
          <p className="kicker">The pipeline</p>
          <div>
            <h2>From first contact to a clear next step.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              PingList.io is the shared list your team works from. New leads come in, someone owns
              them, and the stage shows where things stand.
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

      <section className="section" id="stages">
        <div className="section-head reveal">
          <p className="kicker">Stages</p>
          <h2>Every lead has a place in the pipeline.</h2>
        </div>
        <div className="modules-grid">
          <article className="panel reveal">
            <p className="lede">
              Start with a simple set of stages, or rename them to match how your team already
              talks. A lead moves forward because someone on your team moved it.
            </p>
            <ul className="buyer-stack">
              {STAGES.map((stage) => (
                <li key={stage}>{stage}</li>
              ))}
            </ul>
          </article>
          <article className="panel reveal">
            <p className="lede">
              If one person is away, the lead is still visible. It stays on the list until someone on
              the team updates it.
            </p>
            <p className="pull">A quiet lead is still a lead.</p>
            <p className="pull">A next step keeps it moving.</p>
          </article>
        </div>
      </section>

      <section className="section" id="control">
        <div className="section-head reveal">
          <p className="kicker">Your team</p>
          <h2>Organize the work the way you already run it.</h2>
        </div>
        <div className="card-grid two">
          <article className="panel reveal">
            <h3>Ownership</h3>
            <p className="lede">Assign each lead to a person. Reassign it when the team changes.</p>
          </article>
          <article className="panel reveal">
            <h3>Stages</h3>
            <p className="lede">Use the stages that match your business, from first contact to won.</p>
          </article>
          <article className="panel reveal">
            <h3>Follow-up</h3>
            <p className="lede">See what is waiting, what is overdue, and what has gone quiet.</p>
          </article>
          <article className="panel reveal">
            <h3>Visibility</h3>
            <p className="lede">Managers see the whole pipeline. Teammates see the work they own.</p>
          </article>
        </div>
        <figure className="media-frame reveal band-photo">
          <img
            src="/images/campaign-desk.jpg"
            alt="A desk set up for reviewing an open pipeline"
          />
        </figure>
      </section>

      <section className="section" id="workspace">
        <div className="section-head reveal">
          <p className="kicker">One workspace</p>
          <h2>The whole team works from the same records.</h2>
        </div>
        <div className="modules-grid">
          <article className="panel reveal">
            <p className="lede">
              Notes, stage, and the next step stay on the lead. The story does not live in one
              person’s inbox, and a new teammate can pick up the record without a long handover.
            </p>
          </article>
          <article className="panel reveal">
            <ul className="feature-list">
              <li><span className="dot" /> A shared pipeline</li>
              <li><span className="dot" /> Notes on the record</li>
              <li><span className="dot" /> Handoffs the team can see</li>
              <li><span className="dot" /> A history of what happened</li>
              <li><span className="dot" /> Room for more than one location</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section" id="tracking">
        <div className="section-head reveal">
          <p className="kicker">Visibility</p>
          <h2>See the work, not a pile of messages.</h2>
        </div>
        <div className="modules-grid">
          <article className="panel reveal">
            <h3>On every lead</h3>
            <ul className="feature-list">
              <li><span className="dot" /> Where it came from</li>
              <li><span className="dot" /> Who owns it</li>
              <li><span className="dot" /> The current stage</li>
              <li><span className="dot" /> The last activity</li>
            </ul>
          </article>
          <article className="panel reveal">
            <h3>Across the pipeline</h3>
            <ul className="feature-list">
              <li><span className="dot" /> What is new</li>
              <li><span className="dot" /> What is waiting on a follow-up</li>
              <li><span className="dot" /> What was won or set aside</li>
              <li><span className="dot" /> Which sources bring people in</li>
            </ul>
          </article>
        </div>
        <p className="pull reveal">No guessing. No spreadsheets. No lost threads.</p>
      </section>

      <section className="section" id="quality">
        <div className="section-head reveal">
          <p className="kicker">Clean records</p>
          <div>
            <h2>A shorter list is more useful than a noisy one.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              More names do not mean more customers. PingList.io helps you notice duplicate
              contacts, missing details, leads with no owner, and follow-ups that went quiet —
              before the relationship goes cold.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="connect">
        <div className="section-head reveal">
          <p className="kicker">Where leads come from</p>
          <div>
            <h2>Bring them in from the tools you already use.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Website forms, phone, email, ads, and referrals can feed the same pipeline. If you
              already have another system, PingList.io can sit beside it while your team works the
              follow-up in one place.
            </p>
          </div>
        </div>
        <ul className="chip-list reveal">
          {[
            'Website forms',
            'Phone and email',
            'Referrals',
            'Ads',
            'Webhooks',
            'Spreadsheets',
            'Your current CRM',
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section" id="scale">
        <div className="section-head reveal">
          <p className="kicker">Scale</p>
          <div>
            <h2>From one office to many teams.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              A solo agent and a company with several locations can use the same idea: one pipeline,
              clear owners, and a record of every lead. Add teammates, offices, and industries
              without starting over.
            </p>
          </div>
        </div>
        <figure className="media-frame reveal">
          <img
            src="/images/crm-dashboard.jpg"
            alt="CRM dashboard showing leads, stages, and owners"
          />
        </figure>
      </section>

      <section className="section" id="network">
        <div className="section-head reveal">
          <p className="kicker">In practice</p>
          <div>
            <h2>Turn scattered inquiries into a pipeline.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              The useful change is not a new way to trade leads. It is a shared place for the
              people who already reached out.
            </p>
          </div>
        </div>
        <ol className="flow reveal">
          {[
            'Someone reaches out',
            'PingList.io creates the record',
            'A teammate owns the follow-up',
            'The stage stays current',
            'The business keeps the relationship',
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
          <h2>One way to work every lead you already have.</h2>
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
          <p className="eyebrow">For any business</p>
          <h2>Your leads should not depend on one inbox.</h2>
          <p className="lede" style={{ marginTop: 16 }}>
            People are already reaching out. PingList.io gives every one of them a place on your
            team’s pipeline, whether you sell homes, services, or something else entirely.
          </p>
          <div className="close-lines">
            <span>Capture them.</span>
            <span>Assign them.</span>
            <span>Follow through.</span>
            <span>Keep the record.</span>
          </div>
          <p className="pull">PingList.io. A CRM for every kind of lead.</p>
          <a className="btn btn-solid" href="#contact">
            Talk to us
          </a>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="section-head reveal">
          <p className="kicker">Contact</p>
          <h2>Tell us about your business.</h2>
        </div>
        <div className="contact-grid">
          <article className="panel reveal">
            <img
              className="contact-photo"
              src="/images/about-workspace.jpg"
              alt="A calm desk set up for reviewing an open pipeline"
            />
            <h3>Any industry</h3>
            <p className="lede">
              Tell us how leads come in today and where they get stuck. We reply from the team that
              runs PingList.io.
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
