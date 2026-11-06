import { useMemo, useState } from 'react';

const NAV = [
  { id: 'leads', label: 'Leads Panel', icon: 'leads' },
  { id: 'buyers', label: 'Buyers', icon: 'buyers' },
  { id: 'vendors', label: "Vendor's", icon: 'vendors' },
  { id: 'settings', label: 'Lead Settings', icon: 'settings' },
  { id: 'admin', label: 'Admin Panel', icon: 'admin' },
  { id: 'log', label: 'System Log', icon: 'log' },
  { id: 'docs', label: 'Docs', icon: 'docs' },
];

const GROUPS = [
  { id: 'buyers', label: 'Buyers', color: '#3b6cff' },
  { id: 'sellers', label: 'Sellers', color: '#2fbf71' },
  { id: 'publishers', label: 'Publishers', color: '#7b61ff' },
];

const METRICS = [
  { id: 'sold', label: 'Sold', color: '#1f9d57' },
  { id: 'unsold', label: 'Unsold', color: '#e59a2b' },
  { id: 'amount', label: 'Amount', color: '#6a5cff' },
  { id: 'duplicate', label: 'Duplicate', color: '#e24b57' },
];

function fillDay(start, values) {
  const hours = Array(24).fill(0);
  values.forEach((value, index) => {
    hours[start + index] = value;
  });
  return hours;
}

const DAYS = {
  today: {
    kicker: 'Today',
    label: 'Friday, November 6',
    sold: Array(24).fill(0),
    unsold: Array(24).fill(0),
    duplicate: Array(24).fill(0),
    amount: Array(24).fill(0),
  },
  yesterday: {
    kicker: 'Yesterday',
    label: 'Thursday, November 5',
    sold: fillDay(8, [1, 2, 2, 3, 4, 3, 5, 2, 1, 2, 1]),
    unsold: fillDay(8, [1, 0, 1, 1, 2, 1, 1, 0, 2, 1, 0]),
    duplicate: fillDay(8, [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0]),
    amount: fillDay(8, [48, 96, 96, 144, 192, 144, 240, 96, 48, 96, 48]),
  },
};

const ACTIVE = { buyers: 17, sellers: 0, publishers: 13 };

const LINKS = {
  buyers: [
    ['Tampa Roofing Pro', '6 open · cap 20'],
    ['Orlando Exteriors', '2 open'],
    ['Gulf Coast HVAC', 'Paused at $0'],
    ['Metro Plumbing', '4 open'],
  ],
  sellers: [],
  publishers: [
    ['Website forms', 'Landing'],
    ['Lead ads', '3 campaigns'],
    ['Partner API', 'Live'],
  ],
};

const DIRECTORIES = {
  buyers: {
    title: 'Buyers',
    rows: LINKS.buyers.map(([name, meta]) => ({ name, meta })),
  },
  vendors: { title: "Vendor's", rows: [] },
  settings: {
    title: 'Lead Settings',
    rows: [
      { name: 'Duplicate window', meta: '24 hours' },
      { name: 'Daily cap', meta: '20 leads' },
      { name: 'Open hours', meta: '08:00–18:30' },
    ],
  },
  admin: {
    title: 'Admin Panel',
    rows: [
      { name: 'Team seats', meta: '8 people' },
      { name: 'Billing', meta: 'Preview only' },
    ],
  },
  log: {
    title: 'System Log',
    rows: [
      { name: 'Post accepted', meta: '10:14 · Tampa roof' },
      { name: 'Duplicate skipped', meta: '09:02' },
      { name: 'Cap reached', meta: '08:41 · Gulf Coast HVAC' },
    ],
  },
  docs: {
    title: 'Docs',
    rows: [
      { name: 'Ping and post', meta: 'How a lead is offered' },
      { name: 'Delivery', meta: 'Where a sold lead is sent' },
    ],
  },
};

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function money(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function split(total) {
  const landing = Math.round(total * 0.62);
  return { landing, sellers: total - landing };
}

function hourLabel(hour) {
  return `${String(hour).padStart(2, '0')}:00`;
}

function Glyph({ name }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  };
  if (name === 'leads') {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 9h8M8 12h8M8 15h5" />
      </svg>
    );
  }
  if (name === 'buyers') {
    return (
      <svg {...common}>
        <circle cx="9" cy="9" r="3" />
        <path d="M4.5 18c.6-2.4 2.4-3.5 4.5-3.5s3.9 1.1 4.5 3.5" />
        <circle cx="16.5" cy="9.5" r="2.2" />
        <path d="M16 14.6c1.7.2 3 1.2 3.6 3" />
      </svg>
    );
  }
  if (name === 'vendors') {
    return (
      <svg {...common}>
        <path d="M4 10h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8z" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    );
  }
  if (name === 'settings') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" />
      </svg>
    );
  }
  if (name === 'admin') {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3" />
        <path d="M6 19c1-3 2.8-4.5 6-4.5S17 16 18 19" />
      </svg>
    );
  }
  if (name === 'log') {
    return (
      <svg {...common}>
        <path d="M7 4h8l4 4v12H7z" />
        <path d="M15 4v4h4M10 13h6M10 17h4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M6 5h12v14H6z" />
      <path d="M9 9h6M9 12h6M9 15h3" />
    </svg>
  );
}

function Donut({ active, onPick }) {
  const total = ACTIVE.buyers + ACTIVE.sellers + ACTIVE.publishers;
  const r = 38;
  let angle = -Math.PI / 2;
  const segments = GROUPS.filter((group) => ACTIVE[group.id] > 0).map((group) => {
    const sweep = (ACTIVE[group.id] / total) * Math.PI * 2;
    const gap = 0.08;
    const start = angle + gap / 2;
    const end = angle + sweep - gap / 2;
    angle += sweep;
    const large = sweep - gap > Math.PI ? 1 : 0;
    const point = (rad) => `${60 + r * Math.cos(rad)} ${60 + r * Math.sin(rad)}`;
    return {
      ...group,
      d: `M ${point(start)} A ${r} ${r} 0 ${large} 1 ${point(end)}`,
    };
  });

  return (
    <svg className="pdb-donut" viewBox="0 0 120 120" role="img" aria-label={`${total} active accounts`}>
      <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="12" opacity="0.08" />
      {segments.map((segment) => (
        <path
          key={segment.id}
          d={segment.d}
          fill="none"
          stroke={segment.color}
          strokeWidth={active === segment.id ? 16 : 12}
          strokeLinecap="round"
          opacity={!active || active === segment.id ? 1 : 0.35}
          onClick={() => onPick(segment.id)}
        />
      ))}
      <text x="60" y="58" textAnchor="middle" className="pdb-donut-value">
        {total}
      </text>
      <text x="60" y="74" textAnchor="middle" className="pdb-donut-label">
        ACTIVE
      </text>
    </svg>
  );
}

function Trend({ series, empty, hour, onHour }) {
  const width = 360;
  const height = 112;
  const max = Math.max(1, ...series.flatMap((item) => item.values));
  const quiet = series.every((item) => item.values.every((value) => value === 0));
  if (quiet) return <p className="pdb-empty">{empty}</p>;

  const step = width / 23;
  const line = (values) =>
    values
      .map((value, index) => {
        const x = index * step;
        const y = height - 8 - (value / max) * (height - 16);
        return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

  return (
    <svg
      className="pdb-chart"
      viewBox={`0 0 ${width} ${height}`}
      onMouseLeave={() => onHour(null)}
      aria-hidden="true"
    >
      {series.map((item) => (
        <path
          key={item.id}
          d={line(item.values)}
          fill="none"
          stroke={item.color}
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={item.dim ? 0.22 : 1}
        />
      ))}
      {hour != null && (
        <line x1={hour * step} x2={hour * step} y1="4" y2={height - 4} stroke="currentColor" opacity="0.25" />
      )}
      {Array.from({ length: 24 }, (_, index) => (
        <rect
          key={index}
          x={index * step - step / 2}
          y="0"
          width={step}
          height={height}
          fill="transparent"
          onMouseEnter={() => onHour(index)}
        />
      ))}
    </svg>
  );
}

export default function CrmDashboard() {
  const [theme, setTheme] = useState('light');
  const [nav, setNav] = useState('leads');
  const [dayId, setDayId] = useState('today');
  const [metric, setMetric] = useState(null);
  const [group, setGroup] = useState(null);
  const [hour, setHour] = useState(null);
  const [revenueHour, setRevenueHour] = useState(null);
  const [soldHour, setSoldHour] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [picked, setPicked] = useState(null);
  const day = DAYS[dayId];
  const activeTotal = ACTIVE.buyers + ACTIVE.sellers + ACTIVE.publishers;

  const totals = useMemo(
    () => ({
      sold: sum(day.sold),
      unsold: sum(day.unsold),
      amount: sum(day.amount),
      duplicate: sum(day.duplicate),
    }),
    [day]
  );

  function chooseMetric(id) {
    setMetric((current) => (current === id ? null : id));
    setHour(null);
  }

  function chooseGroup(id) {
    setGroup((current) => (current === id ? null : id));
  }

  function chooseNav(id) {
    setNav(id);
    setQuery('');
    setPicked(null);
    setAccountOpen(false);
  }

  const directory = DIRECTORIES[nav];
  const shownRows = directory
    ? directory.rows.filter((row) => row.name.toLowerCase().includes(query.trim().toLowerCase()))
    : [];
  const pickedRow = shownRows.find((row) => row.name === picked);

  const trendSeries = METRICS.filter((item) => item.id !== 'amount').map((item) => ({
    ...item,
    values: day[item.id],
    dim: metric && metric !== item.id,
  }));

  return (
    <div className={`pdb${theme === 'dark' ? ' is-dark' : ''}`}>
      <aside className="pdb-side">
        <nav className="pdb-nav" aria-label="Dashboard">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={nav === item.id ? 'is-on' : ''}
              aria-current={nav === item.id ? 'page' : undefined}
              onClick={() => chooseNav(item.id)}
            >
              <Glyph name={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="pdb-theme" role="group" aria-label="Theme">
          <button type="button" className={theme === 'light' ? 'is-on' : ''} onClick={() => setTheme('light')}>
            Light
          </button>
          <button type="button" className={theme === 'dark' ? 'is-on' : ''} onClick={() => setTheme('dark')}>
            Dark
          </button>
        </div>
      </aside>

      <div className="pdb-main">
        <div className="pdb-top">
          <div className="pdb-account">
            <button
              type="button"
              className="pdb-account-btn"
              aria-expanded={accountOpen}
              onClick={() => setAccountOpen((open) => !open)}
            >
              <span className="pdb-avatar" aria-hidden="true">
                A
              </span>
              <span>
                <strong>Admin</strong>
                <small>Account</small>
              </span>
            </button>
            {accountOpen && (
              <div className="pdb-menu" role="menu">
                <button type="button" onClick={() => chooseNav('admin')}>
                  Admin panel
                </button>
                <button type="button" onClick={() => setAccountOpen(false)}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>

        {nav === 'leads' ? (
          <>
            <section className="pdb-card pdb-today">
              <p>{day.kicker}</p>
              <div className="pdb-today-row">
                <h3>{day.label}</h3>
                <div className="pdb-days" role="group" aria-label="Day">
                  <button type="button" className={dayId === 'today' ? 'is-on' : ''} onClick={() => setDayId('today')}>
                    Today
                  </button>
                  <button
                    type="button"
                    className={dayId === 'yesterday' ? 'is-on' : ''}
                    onClick={() => setDayId('yesterday')}
                  >
                    Yesterday
                  </button>
                </div>
              </div>
            </section>

            <div className="pdb-stats">
              {METRICS.map((item) => {
                const total = totals[item.id];
                const parts = split(total);
                const display = item.id === 'amount' ? money(total) : String(total);
                const landing = item.id === 'amount' ? money(parts.landing) : String(parts.landing);
                const sellers = item.id === 'amount' ? money(parts.sellers) : String(parts.sellers);
                const landingShare = total ? `${Math.round((parts.landing / total) * 100)}%` : '0%';
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`pdb-stat${metric === item.id ? ' is-on' : ''}`}
                    style={{ '--stat': item.color }}
                    aria-pressed={metric === item.id}
                    onClick={() => chooseMetric(item.id)}
                  >
                    <span className="pdb-stat-label">{item.label}</span>
                    <strong>{display}</strong>
                    <span className="pdb-split">
                      <span>Landing</span>
                      <span className="pdb-track">
                        <i style={{ width: landingShare }} />
                      </span>
                      <span>{landing}</span>
                    </span>
                    <span className="pdb-split">
                      <span>Sellers</span>
                      <span className="pdb-track">
                        <i style={{ width: total ? `${100 - Math.round((parts.landing / total) * 100)}%` : '0%' }} />
                      </span>
                      <span>{sellers}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pdb-charts">
              <section className="pdb-card">
                <header className="pdb-card-head">
                  <h3>Through the day</h3>
                  <div className="pdb-legend">
                    {METRICS.filter((item) => item.id !== 'amount').map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={metric === item.id ? 'is-on' : ''}
                        onClick={() => chooseMetric(item.id)}
                      >
                        <i style={{ background: item.color }} />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </header>
                <Trend
                  series={trendSeries}
                  empty="No lead movement in this period."
                  hour={hour}
                  onHour={setHour}
                />
                <p className="pdb-tip" aria-live="polite">
                  {hour == null
                    ? metric
                      ? `${METRICS.find((item) => item.id === metric).label} selected.`
                      : ''
                    : `${hourLabel(hour)} · Sold ${day.sold[hour]} · Unsold ${day.unsold[hour]} · Duplicate ${day.duplicate[hour]}`}
                </p>
              </section>
              <section className={`pdb-card${metric && metric !== 'amount' ? ' is-dim' : ''}`}>
                <header className="pdb-card-head">
                  <h3>Revenue by hour</h3>
                  <button type="button" className={`pdb-legend-one${metric === 'amount' ? ' is-on' : ''}`} onClick={() => chooseMetric('amount')}>
                    <i style={{ background: '#6a5cff' }} />
                    Amount
                  </button>
                </header>
                <Trend
                  series={[{ id: 'amount', color: '#6a5cff', values: day.amount, dim: metric && metric !== 'amount' }]}
                  empty="No revenue in this period."
                  hour={revenueHour}
                  onHour={setRevenueHour}
                />
                <p className="pdb-tip">
                  {revenueHour == null ? '' : `${hourLabel(revenueHour)} · ${money(day.amount[revenueHour])}`}
                </p>
              </section>
            </div>

            <div className="pdb-lower">
              <section className="pdb-card pdb-accounts">
                <h3>Active accounts</h3>
                <div className="pdb-accounts-body">
                  <Donut active={group} onPick={chooseGroup} />
                  <ul className="pdb-group-list">
                    {GROUPS.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className={group === item.id ? 'is-on' : ''}
                          aria-pressed={group === item.id}
                          onClick={() => chooseGroup(item.id)}
                        >
                          <i style={{ background: item.color }} />
                          <span>{item.label}</span>
                          <strong>{ACTIVE[item.id]}</strong>
                          <em>{activeTotal ? `${Math.round((ACTIVE[item.id] / activeTotal) * 100)}%` : '0%'}</em>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
              <section className="pdb-card">
                <header className="pdb-card-head">
                  <h3>Sold leads by hour</h3>
                  <div className="pdb-legend">
                    {GROUPS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={group === item.id ? 'is-on' : ''}
                        onClick={() => chooseGroup(item.id)}
                      >
                        <i style={{ background: item.color }} />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </header>
                <Trend
                  series={GROUPS.map((item) => ({
                    id: item.id,
                    color: item.color,
                    values: item.id === 'sellers' ? Array(24).fill(0) : day.sold.map((value) => Math.round(value * (item.id === 'buyers' ? 0.7 : 0.3))),
                    dim: group && group !== item.id,
                  }))}
                  empty="No sold leads in this period."
                  hour={soldHour}
                  onHour={setSoldHour}
                />
                <p className="pdb-tip" aria-live="polite">
                  {soldHour == null
                    ? ''
                    : `${hourLabel(soldHour)} · ${day.sold[soldHour]} sold`}
                </p>
              </section>
            </div>

            <div className="pdb-links">
              {GROUPS.map((item) => {
                const rows = group === item.id ? LINKS[item.id] : [];
                return (
                  <section key={item.id} className={`pdb-card${group === item.id ? ' is-on' : ''}`}>
                    <button type="button" className="pdb-link-title" onClick={() => chooseGroup(item.id)}>
                      {item.label}
                    </button>
                    {rows.length === 0 ? (
                      <p className="pdb-empty">No links in this period.</p>
                    ) : (
                      <ul className="pdb-link-list">
                        {rows.map(([name, meta]) => (
                          <li key={name}>
                            <strong>{name}</strong>
                            <span>{meta}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                );
              })}
            </div>
          </>
        ) : (
          <section className="pdb-card pdb-directory">
            <header className="pdb-card-head">
              <h3>{directory.title}</h3>
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPicked(null);
                }}
                placeholder="Search"
                aria-label={`Search ${directory.title}`}
              />
            </header>
            {shownRows.length === 0 ? (
              <p className="pdb-empty">No links in this period.</p>
            ) : (
              <ul className="pdb-dir-list">
                {shownRows.map((row) => (
                  <li key={row.name}>
                    <button
                      type="button"
                      className={picked === row.name ? 'is-on' : ''}
                      aria-pressed={picked === row.name}
                      onClick={() => setPicked((current) => (current === row.name ? null : row.name))}
                    >
                      <strong>{row.name}</strong>
                      <span>{row.meta}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {pickedRow && (
              <p className="pdb-detail">
                {pickedRow.name}. {pickedRow.meta}.
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
