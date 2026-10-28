import { useEffect, useId, useRef, useState } from 'react';

const logo = `${process.env.PUBLIC_URL}/logo.svg`;

function useDrawId() {
  return useId().replace(/:/g, '');
}

export function CrmNetworkDraw() {
  const uid = useDrawId();
  const id = (name) => `${name}-${uid}`;
  const inbound = [['p1', '0s'], ['p2', '-1.2s'], ['p3', '-0.6s'], ['p4', '-1.8s']];
  const outbound = [['b1', '0s'], ['b2', '-0.4s'], ['b4', '-0.8s']];

  return (
    <figure className="hi-draw">
      <svg viewBox="0 0 460 400" role="img" aria-label="Lead sources flow through PingList to the team. One person is assigned as owner.">
        <defs>
          <linearGradient id={id('lg')} x1="0" x2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="var(--accent)" stopOpacity="0.7" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <g className="hi-draw-kicker">
          <text x="20" y="34">Lead sources</text>
          <text x="440" y="34" textAnchor="end">Your team</text>
        </g>
        <g stroke={`url(#${id('lg')})`} strokeWidth="1.5" fill="none">
          <path id={id('p1')} d="M100 90 C160 90 175 200 230 200" />
          <path id={id('p2')} d="M100 170 C160 170 175 200 230 200" />
          <path id={id('p3')} d="M100 250 C160 250 175 200 230 200" />
          <path id={id('p4')} d="M100 330 C160 330 175 200 230 200" />
          <path id={id('b1')} d="M230 200 C285 200 300 90 350 90" />
          <path id={id('b2')} d="M230 200 C285 200 300 170 350 170" />
          <path id={id('b3')} d="M230 200 C285 200 300 250 350 250" />
          <path id={id('b4')} d="M230 200 C285 200 300 330 350 330" />
        </g>
        <g className="hi-draw-node">
          <rect x="20" y="74" width="80" height="32" rx="8" />
          <rect x="20" y="154" width="80" height="32" rx="8" />
          <rect x="20" y="234" width="80" height="32" rx="8" />
          <rect x="20" y="314" width="80" height="32" rx="8" />
          <rect x="350" y="74" width="90" height="32" rx="8" />
          <rect x="350" y="154" width="90" height="32" rx="8" />
          <rect x="350" y="234" width="90" height="32" rx="8" className="is-owner" />
          <rect x="350" y="314" width="90" height="32" rx="8" />
        </g>
        <g className="crm-node-label">
          <text x="60" y="94" textAnchor="middle">Web form</text>
          <text x="60" y="174" textAnchor="middle">Lead ads</text>
          <text x="60" y="254" textAnchor="middle">Calls</text>
          <text x="60" y="334" textAnchor="middle">Email</text>
          <text x="395" y="94" textAnchor="middle">Sales</text>
          <text x="395" y="174" textAnchor="middle">Support</text>
          <text x="395" y="254" textAnchor="middle" className="is-owner">Sara · owner</text>
          <text x="395" y="334" textAnchor="middle">Partners</text>
        </g>
        <circle className="hi-draw-pulse" cx="230" cy="200" r="58" fill="none">
          <animate attributeName="r" values="44;70;44" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.45;0;0.45" dur="3s" repeatCount="indefinite" />
        </circle>
        <image href={logo} x="202" y="172" width="56" height="56" />
        <g className="hi-draw-lead">
          {inbound.map(([name, begin]) => (
            <circle key={name} r="3.5">
              <animateMotion dur="2.4s" begin={begin} repeatCount="indefinite"><mpath href={`#${id(name)}`} /></animateMotion>
            </circle>
          ))}
        </g>
        <g className="hi-draw-ping">
          {outbound.map(([name, begin]) => (
            <circle key={name} r="2.5" opacity="0.8">
              <animateMotion dur="1.6s" begin={begin} repeatCount="indefinite"><mpath href={`#${id(name)}`} /></animateMotion>
            </circle>
          ))}
        </g>
        <circle className="hi-draw-post" r="4.5">
          <animateMotion dur="1.6s" begin="-1.2s" repeatCount="indefinite"><mpath href={`#${id('b3')}`} /></animateMotion>
        </circle>
        <text className="hi-draw-hub" x="230" y="258" textAnchor="middle">Route, then follow up</text>
      </svg>
      <figcaption className="hi-draw-foot">
        <div className="hi-draw-latency"><strong>&lt;1 sec</strong><span>Lead to owner</span></div>
        <ul className="hi-draw-legend">
          <li><i className="is-lead" />New lead</li>
          <li><i className="is-ping" />Routed</li>
          <li><i className="is-post" />Owner assigned</li>
        </ul>
      </figcaption>
    </figure>
  );
}

const CRM_STEPS = [
  {
    title: 'Capture',
    copy: 'A lead arrives from a form, an ad, a call, an email, or the API. The source stays on the record.',
    time: '0.1 sec',
    rows: [['Facebook lead ad', 'Tagged', 'ok'], ['Name, phone, email', 'Saved', 'ok'], ['Campaign', 'Tracked'], ['Consent', 'Confirmed', 'ok']],
  },
  {
    title: 'Verify and dedupe',
    copy: 'Phone and email are checked, and the lead is matched so nobody is contacted twice.',
    time: '0.2 sec',
    rows: [['Phone number', 'Verified', 'ok'], ['Email', 'Verified', 'ok'], ['Existing contact', 'Unique', 'ok'], ['Spam', 'Clear', 'ok']],
  },
  {
    title: 'Assign an owner',
    copy: 'Rules pick a person by area, skill, workload, or rotation, and only people who are on shift.',
    time: '0.4 sec',
    reps: [['Sara · Sales', 3, 'Assigned', 'ok'], ['Omar · Sales', 5, 'Next', 'dim'], ['Lina · Sales', 4, 'Other area', 'dim'], ['Yousef · Sales', 0, 'Off shift', 'warn']],
  },
  {
    title: 'Follow up',
    copy: 'The lead lands in the right stage. A welcome message goes out and a call task is set.',
    time: '0.8 sec',
    rows: [['Stage', 'New', 'ok'], ['Welcome message', 'Sent', 'ok'], ['Call within 5 min', 'Created', 'ok'], ['No reply', 'Reminder set']],
  },
];

export function CrmPipeDraw() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);
  const step = CRM_STEPS[active];

  useEffect(() => () => clearTimeout(timer.current), []);

  function stop() {
    clearTimeout(timer.current);
    timer.current = null;
    setPlaying(false);
  }

  function play() {
    if (timer.current) {
      stop();
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPlaying(true);
    let index = 0;
    setActive(0);
    const tick = () => {
      index += 1;
      if (index > 3) {
        stop();
        return;
      }
      setActive(index);
      timer.current = setTimeout(tick, reduce ? 0 : 1700);
    };
    timer.current = setTimeout(tick, reduce ? 0 : 1700);
  }

  const progress = (active / 3) * 100;

  return (
    <div className="hi-pipe-wrap">
      <div className="hi-pipe-ctrl">
        <button className="btn btn-solid" type="button" onClick={play} aria-pressed={playing}>
          {playing ? 'Stop' : 'Play a lead'}
        </button>
        <span>Elapsed {step.time}</span>
      </div>
      <div className="hi-pipe" role="tablist" aria-label="How a lead moves through PingList">
        <div className="hi-pipe-track" aria-hidden="true">
          <span className="hi-pipe-fill" style={{ width: `${progress}%` }} />
          <span className="hi-pipe-packet" style={{ left: `${progress}%` }} />
        </div>
        {CRM_STEPS.map((item, index) => (
          <button
            className={`hi-step${index === active ? ' is-on' : ''}${index < active ? ' is-done' : ''}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            key={item.title}
            onClick={() => { stop(); setActive(index); }}
          >
            <span className="hi-step-node">{index + 1}</span>
            <span className="hi-step-k">Step 0{index + 1}</span>
            <span className="hi-step-t">{item.title}</span>
          </button>
        ))}
      </div>
      <div className="hi-pipe-detail" aria-live="polite">
        <article className="panel">
          <div className="hi-pipe-meta">
            <span className="product-tag">Step {active + 1} of 4</span>
            <span>{step.time}</span>
          </div>
          <h3>{step.title}</h3>
          <p className="lede">{step.copy}</p>
        </article>
        <article className="panel">
          {step.rows ? (
            <dl className="hi-fields">
              {step.rows.map(([name, value, tone]) => (
                <div key={name}><dt>{name}</dt><dd className={tone ? `is-${tone}` : undefined}>{value}</dd></div>
              ))}
            </dl>
          ) : (
            <>
              <dl className="hi-bid-head">
                <div><dt>On shift</dt><dd>3 of 4</dd></div>
                <div><dt>Rule</dt><dd>Area + rotation</dd></div>
                <div><dt>Owner</dt><dd className="is-ok">Sara</dd></div>
              </dl>
              <ul className="hi-bids">
                {step.reps.map(([name, open, label, tone]) => (
                  <li key={name} className={tone === 'ok' ? 'is-win' : undefined}>
                    <span>{name}</span>
                    <span className="hi-bid-bar"><i style={{ width: `${(open / 6) * 100}%` }} /></span>
                    <span>{open} open</span>
                    <span className={tone ? `is-${tone}` : undefined}>{label}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>
      </div>
    </div>
  );
}

const SOURCES = [
  ['Website forms', 30],
  ['Lead ads', 78],
  ['Calls and SMS', 126],
  ['Email inbox', 174],
  ['CSV and API', 222],
];

export function CrmConnectDraw() {
  const uid = useDrawId();
  return (
    <figure className="hi-draw hi-draw-delivery">
      <svg viewBox="0 0 460 250" role="img" aria-label="Forms, ads, calls, email, and the API feed into PingList.">
        <g className="hi-draw-wire" fill="none" strokeWidth="1.5">
          {SOURCES.map(([name, y]) => <path key={name} id={`s-${y}-${uid}`} d={`M160 ${y} C240 ${y} 260 125 340 125`} />)}
        </g>
        <g className="hi-draw-flow" fill="none" strokeWidth="2" strokeDasharray="4 8">
          {SOURCES.filter((_, i) => i % 2 === 0).map(([name, y], index) => (
            <use key={name} href={`#s-${y}-${uid}`}>
              <animate attributeName="stroke-dashoffset" from="24" to="0" dur={`${1 + index * 0.3}s`} repeatCount="indefinite" />
            </use>
          ))}
        </g>
        <g className="hi-draw-tool">
          {SOURCES.map(([name, y]) => (
            <g key={name}>
              <rect x="14" y={y - 16} width="146" height="32" rx="8" />
              <text x="28" y={y + 5}>{name}</text>
            </g>
          ))}
        </g>
        <g className="hi-draw-post">
          {SOURCES.map(([, y]) => <circle key={y} cx="146" cy={y} r="3.5" />)}
        </g>
        <circle className="hi-draw-pulse" cx="380" cy="125" r="46" fill="none">
          <animate attributeName="r" values="42;58;42" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <image href={logo} x="352" y="97" width="56" height="56" />
        <g className="hi-draw-lead">
          {SOURCES.map(([, y], index) => (
            <circle key={y} r="3.5">
              <animateMotion dur="1.4s" begin={`${-index * 0.25}s`} repeatCount="indefinite">
                <mpath href={`#s-${y}-${uid}`} />
              </animateMotion>
            </circle>
          ))}
        </g>
      </svg>
      <figcaption className="hi-draw-foot">
        <ul className="hi-draw-chips">
          <li>Forms</li><li>Ads</li><li>Webhooks</li><li>API</li><li>CSV</li>
        </ul>
      </figcaption>
    </figure>
  );
}

export function CrmRouting() {
  const hours = Array.from({ length: 24 }, (_, hour) => hour >= 8 && hour <= 18);
  return (
    <div className="hi-board-grid crm-routing">
      <article className="panel hi-rule">
        <h3>Fair rotation</h3>
        <p>Round-robin or a set share, so the team splits the new leads.</p>
        <dl className="hi-fields">
          <div><dt>Sara</dt><dd>34%</dd></div>
          <div><dt>Omar</dt><dd>33%</dd></div>
          <div><dt>Lina</dt><dd>33%</dd></div>
        </dl>
      </article>
      <article className="panel hi-rule">
        <h3>Area and hours</h3>
        <p>Route by city or ZIP, and only while someone is on shift.</p>
        <div className="crm-hours" aria-label="Open from 8:00 to 18:30">
          {hours.map((on, hour) => <i key={hour} className={on ? 'is-on' : undefined} />)}
        </div>
        <p className="crm-hours-label">Open 08:00–18:30</p>
      </article>
      <article className="panel hi-rule">
        <h3>Rules and caps</h3>
        <p>Skip duplicates, and stop a person once they hit the day’s limit.</p>
        <dl className="hi-fields">
          <div><dt>Skip duplicates</dt><dd className="is-ok">On</dd></div>
          <div><dt>Daily cap</dt><dd>20 leads</dd></div>
        </dl>
      </article>
      <article className="panel hi-rule">
        <h3>Sell leads, if you want</h3>
        <p>Lead sellers can bid in real time. Delivery waits until the wallet can pay.</p>
        <dl className="hi-fields">
          <div><dt>Wallet</dt><dd>$2,363.50</dd></div>
          <div><dt>Pause at $0</dt><dd className="is-ok">On</dd></div>
        </dl>
      </article>
    </div>
  );
}
