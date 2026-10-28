import { useEffect, useId, useRef, useState } from 'react';

const logo = `${process.env.PUBLIC_URL}/logo.svg`;

function useDrawId() {
  return useId().replace(/:/g, '');
}

export function LeadNetworkDraw() {
  const uid = useDrawId();
  const id = (name) => `${name}-${uid}`;
  const inbound = [
    ['p1', '0s'],
    ['p2', '-1.2s'],
    ['p3', '-0.6s'],
    ['p4', '-1.8s'],
  ];
  const outbound = [
    ['b1', '0s'],
    ['b2', '-0.3s'],
    ['b4', '-0.6s'],
    ['b5', '-0.9s'],
  ];

  return (
    <figure className="hi-draw">
      <svg viewBox="0 0 460 400" role="img" aria-label="Lead sellers ping contractors through PingList. The best fit is posted.">
        <defs>
          <linearGradient id={id('lg')} x1="0" x2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="var(--accent)" stopOpacity="0.7" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <g className="hi-draw-kicker">
          <text x="36" y="34">Lead sellers</text>
          <text x="422" y="34" textAnchor="end">Contractors</text>
        </g>
        <g stroke={`url(#${id('lg')})`} strokeWidth="1.5" fill="none">
          <path id={id('p1')} d="M70 90 C150 90 170 200 230 200" />
          <path id={id('p2')} d="M70 170 C150 170 170 200 230 200" />
          <path id={id('p3')} d="M70 250 C150 250 170 200 230 200" />
          <path id={id('p4')} d="M70 330 C150 330 170 200 230 200" />
          <path id={id('b1')} d="M230 200 C290 200 310 80 390 80" />
          <path id={id('b2')} d="M230 200 C290 200 310 150 390 150" />
          <path id={id('b3')} d="M230 200 C290 200 310 220 390 220" />
          <path id={id('b4')} d="M230 200 C290 200 310 290 390 290" />
          <path id={id('b5')} d="M230 200 C290 200 310 350 390 350" />
        </g>
        <g className="hi-draw-node">
          <rect x="38" y="76" width="34" height="28" rx="7" />
          <rect x="38" y="156" width="34" height="28" rx="7" />
          <rect x="38" y="236" width="34" height="28" rx="7" />
          <rect x="38" y="316" width="34" height="28" rx="7" />
          <rect x="388" y="66" width="34" height="28" rx="7" />
          <rect x="388" y="136" width="34" height="28" rx="7" />
          <rect x="388" y="206" width="34" height="28" rx="7" />
          <rect x="388" y="276" width="34" height="28" rx="7" />
          <rect x="388" y="336" width="34" height="28" rx="7" />
        </g>
        <g className="hi-draw-ping">
          <circle cx="55" cy="90" r="3" />
          <circle cx="55" cy="170" r="3" />
          <circle cx="55" cy="250" r="3" />
          <circle cx="55" cy="330" r="3" />
          <circle cx="405" cy="80" r="3" />
          <circle cx="405" cy="150" r="3" />
          <circle cx="405" cy="290" r="3" />
          <circle cx="405" cy="350" r="3" />
        </g>
        <circle className="hi-draw-post" cx="405" cy="220" r="4" />
        <circle className="hi-draw-pulse" cx="230" cy="200" r="58" fill="none">
          <animate attributeName="r" values="44;70;44" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.45;0;0.45" dur="3s" repeatCount="indefinite" />
        </circle>
        <image href={logo} x="202" y="172" width="56" height="56" />
        <g className="hi-draw-lead">
          {inbound.map(([name, begin]) => (
            <circle key={name} r="3.5">
              <animateMotion dur="2.4s" begin={begin} repeatCount="indefinite">
                <mpath href={`#${id(name)}`} />
              </animateMotion>
            </circle>
          ))}
        </g>
        <g className="hi-draw-ping">
          {outbound.map(([name, begin]) => (
            <circle key={name} r="2.5" opacity="0.8">
              <animateMotion dur="1.6s" begin={begin} repeatCount="indefinite">
                <mpath href={`#${id(name)}`} />
              </animateMotion>
            </circle>
          ))}
        </g>
        <circle className="hi-draw-post" r="4.5">
          <animateMotion dur="1.6s" begin="-1.2s" repeatCount="indefinite">
            <mpath href={`#${id('b3')}`} />
          </animateMotion>
        </circle>
        <text className="hi-draw-hub" x="230" y="258" textAnchor="middle">Ping, then post</text>
        <text className="hi-draw-fit" x="370" y="244" textAnchor="end">Best fit</text>
      </svg>
      <figcaption className="hi-draw-foot">
        <div className="hi-draw-latency">
          <strong>&lt;1 sec</strong>
          <span>Ping to post</span>
        </div>
        <ul className="hi-draw-legend">
          <li><i className="is-lead" />New lead</li>
          <li><i className="is-ping" />Ping</li>
          <li><i className="is-post" />Post</li>
        </ul>
      </figcaption>
    </figure>
  );
}

const TOOLS = [
  { name: 'Salesforce', y: 14, label: 35, path: 'c0', begin: '0s' },
  { name: 'Webhooks', y: 62, label: 83, path: 'c1', begin: '-0.5s' },
  { name: 'ServiceTitan', y: 110, label: 131, path: 'c2', begin: '-1s' },
  { name: 'AccuLynx', y: 158, label: 179, path: 'c3', begin: '-1.5s' },
  { name: 'LeadPerfection', y: 206, label: 227, path: 'c4', begin: '-2s' },
];

export function DeliveryDraw() {
  const uid = useDrawId();
  const id = (name) => `${name}-${uid}`;

  return (
    <figure className="hi-draw hi-draw-delivery">
      <svg viewBox="0 0 460 250" role="img" aria-label="PingList posts a lead into contractor tools, and booking status syncs back.">
        <defs>
          {TOOLS.map((tool) => (
            <path key={tool.path} id={id(tool.path)} d={deliveryPath(tool.path)} />
          ))}
        </defs>
        <g className="hi-draw-wire" fill="none" strokeWidth="1.5">
          {TOOLS.map((tool) => (
            <use key={tool.path} href={`#${id(tool.path)}`} />
          ))}
        </g>
        <g className="hi-draw-flow" fill="none" strokeWidth="2" strokeDasharray="4 8">
          {TOOLS.map((tool, index) => (
            <use key={tool.path} href={`#${id(tool.path)}`}>
              <animate attributeName="stroke-dashoffset" from="24" to="0" dur={`${(1 + index * 0.15).toFixed(2)}s`} repeatCount="indefinite" />
            </use>
          ))}
        </g>
        <circle className="hi-draw-pulse" cx="80" cy="125" r="46" fill="none">
          <animate attributeName="r" values="42;58;42" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <image href={logo} x="52" y="97" width="56" height="56" />
        <g className="hi-draw-tool">
          {TOOLS.map((tool) => (
            <g key={tool.name}>
              <rect x="300" y={tool.y} width="146" height="32" rx="8">
                <animate
                  attributeName="stroke"
                  values="rgba(20,24,32,0.14);rgba(20,24,32,0.14);#2a4bff;rgba(20,24,32,0.14)"
                  keyTimes="0;0.42;0.62;1"
                  dur="2.5s"
                  begin={tool.begin}
                  repeatCount="indefinite"
                />
              </rect>
              <text x="314" y={tool.label}>{tool.name}</text>
            </g>
          ))}
        </g>
        <g className="hi-draw-lead">
          {TOOLS.map((tool) => (
            <circle key={tool.path} r="3.5">
              <animateMotion dur="1.25s" begin={tool.begin} repeatCount="indefinite">
                <mpath href={`#${id(tool.path)}`} />
              </animateMotion>
              <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.45;0.5;1" dur="2.5s" begin={tool.begin} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
        <g className="hi-draw-post">
          {TOOLS.map((tool) => (
            <circle key={tool.path} r="2.6">
              <animateMotion dur="2.5s" begin={tool.begin} repeatCount="indefinite" keyPoints="1;1;0;0" keyTimes="0;0.5;0.95;1" calcMode="linear">
                <mpath href={`#${id(tool.path)}`} />
              </animateMotion>
              <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.52;0.93;1" dur="2.5s" begin={tool.begin} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
        <g className="hi-draw-post">
          {TOOLS.map((tool) => (
            <circle key={tool.name} cx="432" cy={tool.y + 16} r="3.5">
              <animate attributeName="r" values="3.5;3.5;6;3.5;3.5" keyTimes="0;0.45;0.52;0.65;1" dur="2.5s" begin={tool.begin} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      </svg>
      <figcaption className="hi-draw-foot">
        <ul className="hi-draw-chips">
          <li>Native delivery</li>
          <li>Status syncs back</li>
          <li>Webhooks and API</li>
        </ul>
      </figcaption>
    </figure>
  );
}

function deliveryPath(name) {
  const end = { c0: 30, c1: 78, c2: 126, c3: 174, c4: 222 }[name];
  return `M120 125 C200 125 220 ${end} 300 ${end}`;
}

function Glyph({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const PIPE_STEPS = [
  {
    title: 'Ping and screen',
    copy: 'Checks homeowner status, consent, and ZIP. Contact details stay hidden.',
    time: '0.1 sec',
    icon: (
      <Glyph>
        <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
      </Glyph>
    ),
    rows: [
      ['Trade', 'Roofing'],
      ['ZIP', '33602'],
      ['Homeowner', 'Verified', 'ok'],
      ['Consent and DNC', 'Clear', 'ok'],
      ['Contact info', 'Hidden', 'dim'],
    ],
  },
  {
    title: 'Check fit and caps',
    copy: 'Confirms the contractor’s radius, shift, daily cap, and wallet.',
    time: '0.2 sec',
    icon: (
      <Glyph>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="m9 16 2 2 4-4" />
      </Glyph>
    ),
    rows: [
      ['ZIP inside the radius', 'Yes', 'ok'],
      ['Crew on shift', 'Open', 'ok'],
      ['Daily cap', '4 / 6'],
      ['Wallet balance', 'Funded', 'ok'],
    ],
  },
  {
    title: 'Real-time auction',
    copy: 'Buyers bid or accept. If the top bid is capped, the lead moves to the next match.',
    time: '0.6 sec',
    icon: (
      <Glyph>
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </Glyph>
    ),
    bids: [
      ['Tampa Roofing Pro', 68, 'Winner', 'ok'],
      ['Orlando Exterior Group', 59, 'Lower', 'dim'],
      ['Statewide Roofing', 52, 'Lower', 'dim'],
      ['Gulf Coast HVAC', 0, 'Capped', 'warn'],
    ],
  },
  {
    title: 'Post and settle',
    copy: 'The wallet is charged once. Name, phone, address, and project notes go to the buyer.',
    time: '0.8 sec',
    icon: (
      <Glyph>
        <path d="m22 2-7 20-4-9-9-4z" />
        <path d="M22 2 11 13" />
      </Glyph>
    ),
    rows: [
      ['Wallet charged', 'Once', 'ok'],
      ['Name and phone', 'Sent', 'ok'],
      ['Property address', 'Sent', 'ok'],
      ['Project notes', 'Sent', 'ok'],
      ['ServiceTitan', '200 OK', 'ok'],
    ],
  },
];

export function PipeDraw() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);
  const step = PIPE_STEPS[active];
  const maxBid = 68;

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

  function choose(index) {
    stop();
    setActive(index);
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
      <div className="hi-pipe" role="tablist" aria-label="How a roofing lead moves through PingList">
        <div className="hi-pipe-track" aria-hidden="true">
          <span className="hi-pipe-fill" style={{ width: `${progress}%` }} />
          <span className="hi-pipe-packet" style={{ left: `${progress}%` }} />
        </div>
        {PIPE_STEPS.map((item, index) => (
          <button
            className={`hi-step${index === active ? ' is-on' : ''}${index < active ? ' is-done' : ''}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            key={item.title}
            onClick={() => choose(index)}
          >
            <span className="hi-step-node">{item.icon}</span>
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
                <div key={name}>
                  <dt>{name}</dt>
                  <dd className={tone ? `is-${tone}` : undefined}>{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <>
              <dl className="hi-bid-head">
                <div><dt>Contractors pinged</dt><dd>4</dd></div>
                <div><dt>Minimum price</dt><dd>$45.00</dd></div>
                <div><dt>Winning price</dt><dd className="is-ok">$68.00</dd></div>
              </dl>
              <ul className="hi-bids">
                {step.bids.map(([name, amount, label, tone]) => (
                  <li key={name} className={tone === 'ok' ? 'is-win' : undefined}>
                    <span>{name}</span>
                    <span className="hi-bid-bar"><i style={{ width: `${amount ? (amount / maxBid) * 100 : 0}%` }} /></span>
                    <span>{amount ? `$${amount.toFixed(2)}` : '—'}</span>
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

const PING_FIELDS = [
  ['Trade', 'Roofing · full replacement'],
  ['ZIP', '33602'],
  ['Homeowner', 'Verified', 'ok'],
  ['Name', 'Hidden until post', 'dim'],
  ['Phone and address', 'Hidden until post', 'dim'],
];

const POST_FIELDS = [
  ['Trade', 'Roofing · full replacement'],
  ['ZIP', '33602'],
  ['Homeowner', 'Verified', 'ok'],
  ['Name', 'J. Rivera', 'ok'],
  ['Phone and address', '(813) 555-0142 · Tampa, FL', 'ok'],
];

export function PingPostDraw() {
  return (
    <div className="modules-grid">
      <article className="panel">
        <span className="product-tag">Ping</span>
        <h3>What contractors see</h3>
        <p className="lede">Trade, ZIP, and homeowner status. The contact record stays hidden.</p>
        <FieldList rows={PING_FIELDS} label="Example ping" />
      </article>
      <article className="panel hi-post-card">
        <span className="product-tag">Post</span>
        <h3>What the winner receives</h3>
        <p className="lede">Only the buyer who fit gets the name, phone, and property address.</p>
        <FieldList rows={POST_FIELDS} label="Example post" />
      </article>
    </div>
  );
}

function FieldList({ rows, label }) {
  return (
    <div className="hi-field-block">
      <span className="hi-fields-label">{label}</span>
      <dl className="hi-fields">
        {rows.map(([name, value, tone]) => (
          <div key={name}>
            <dt>{name}</dt>
            <dd className={tone ? `is-${tone}` : undefined}>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const RULE_GROUPS = [
  {
    title: 'Routing',
    cards: [
      {
        title: 'Waterfall',
        copy: 'The lead tries preferred buyers in order until one accepts.',
        rows: [
          ['1 · Tampa Roofing Pro', 'Capped', 'warn'],
          ['2 · Orlando Exterior', 'Declined', 'dim'],
          ['3 · Statewide Roofing', 'Accepted', 'ok'],
        ],
      },
      {
        title: 'Weighted round robin',
        copy: 'Eligible contractors share leads by the share you set.',
        rows: [
          ['Tampa Roofing Pro', '50%'],
          ['Orlando Exterior', '30%'],
          ['Statewide Roofing', '20%'],
        ],
      },
      {
        title: 'Automatic retry',
        copy: 'A rejected lead is offered to the next eligible buyer.',
        rows: [
          ['First post', 'Rejected', 'bad'],
          ['Retry', 'Accepted', 'ok'],
          ['Time to resell', '120 ms'],
        ],
      },
      {
        title: 'Suppression',
        copy: 'The same address is not sold again inside the window you set.',
        rows: [
          ['Address', 'Sold 12 days ago'],
          ['Window', '30 days'],
          ['Resale', 'Blocked', 'bad'],
        ],
      },
    ],
  },
  {
    title: 'Checks',
    cards: [
      {
        title: 'Consent',
        copy: 'The timestamp and source of the customer’s agreement stay on the record.',
        rows: [
          ['Consent', 'Captured', 'ok'],
          ['Timestamp', '14:02:11 ET'],
          ['Source', 'example.com/quote'],
        ],
      },
      {
        title: 'Do-not-call',
        copy: 'Phone numbers are checked against national and state lists.',
        rows: [
          ['National list', 'Clear', 'ok'],
          ['State list', 'Clear', 'ok'],
          ['Check time', 'Instant'],
        ],
      },
      {
        title: 'Duplicates',
        copy: 'A repeat phone, email, or address can be blocked.',
        rows: [
          ['Phone', 'Match found', 'warn'],
          ['Email', 'No match'],
          ['Submission', 'Blocked', 'bad'],
        ],
      },
      {
        title: 'Location check',
        copy: 'The form ZIP is compared with where the submission came from.',
        rows: [
          ['IP location', 'Tampa, FL'],
          ['Form ZIP', '33602'],
          ['Geo match', 'Passed', 'ok'],
        ],
      },
    ],
  },
  {
    title: 'Numbers',
    cards: [
      {
        title: 'Live totals',
        copy: 'Volume, acceptance, and open campaigns stay in view.',
        rows: [
          ['Leads today', '412'],
          ['Acceptance', '78%', 'ok'],
          ['Live campaigns', '26'],
        ],
      },
      {
        title: 'Margin',
        copy: 'Contractor price minus the seller payout is the margin on that lead.',
        rows: [
          ['Contractor price', '$68.00'],
          ['Seller payout', '−$42.00'],
          ['Margin', '$26.00', 'ok'],
        ],
      },
      {
        title: 'Seller quality',
        copy: 'Source quality, returns, and payout reports stay with the seller.',
        rows: [
          ['Source quality', '94%', 'ok'],
          ['Returns', '3.1%'],
          ['Payout report', 'Automated'],
        ],
      },
      {
        title: 'Closed jobs',
        copy: 'A buyer’s system can send back when the job is won.',
        rows: [
          ['Lead #89211', 'Closed', 'ok'],
          ['Job value', '$14,200'],
          ['Source', 'ServiceTitan'],
        ],
      },
    ],
  },
];

export function RuleBoards() {
  return (
    <div className="hi-rule-groups">
      {RULE_GROUPS.map((group) => (
        <section key={group.title}>
          <h3>{group.title}</h3>
          <div className="hi-board-grid">
            {group.cards.map((card) => (
              <article className="panel hi-rule" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <dl className="hi-fields">
                  {card.rows.map(([name, value, tone]) => (
                    <div key={name}>
                      <dt>{name}</dt>
                      <dd className={tone ? `is-${tone}` : undefined}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function WalletDraw() {
  return (
    <div className="hi-wallet">
      <ul className="hi-wallet-points">
        <li>
          <strong>Fund first</strong>
          <span>A lead posts only when the wallet can cover it. At $0, the campaign pauses.</span>
        </li>
        <li>
          <strong>Held during the sale</strong>
          <span>The price is held until the lead settles, so the balance does not go below zero.</span>
        </li>
        <li>
          <strong>Your margin</strong>
          <span>Set a dollar amount, a percentage, or a minimum price per trade.</span>
        </li>
        <li>
          <strong>Returns</strong>
          <span>A wrong number or a renter can be credited back to the wallet.</span>
        </li>
      </ul>
      <aside className="panel hi-ledger" aria-label="Example contractor wallet">
        <div className="hi-ledger-head">
          <span>Contractor wallet · example</span>
          <span className="product-tag">Active</span>
        </div>
        <div className="hi-balances">
          <div>
            <span>Available</span>
            <strong>$2,450.00</strong>
          </div>
          <div>
            <span>Pending hold</span>
            <strong className="is-hold">$68.00</strong>
          </div>
        </div>
        <ul className="hi-txns">
          <li>
            <div>
              <span>Lead #89211 · Tampa roof replacement</span>
              <b className="is-hold">−$68.00</b>
            </div>
            <p><span>Hold</span><i /><span>Settled</span></p>
          </li>
          <li className="is-done">
            <div>
              <span>Lead #89210 · Miami HVAC</span>
              <b>−$55.00</b>
            </div>
            <p><span>Hold</span><i /><span>Settled</span></p>
          </li>
          <li className="is-credit">
            <div>
              <span>Invalid contact returned</span>
              <b className="is-ok">+$68.00</b>
            </div>
            <p><span>Return</span><i /><span>Credited</span></p>
          </li>
        </ul>
        <p className="hi-pause">Campaigns pause when the balance hits $0.00</p>
      </aside>
    </div>
  );
}
