import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../gsapSetup';

const ROWS = [
  { name: 'New inquiry', note: 'Real estate · downtown', tag: 'New', hot: true },
  { name: 'Policy question', note: 'Insurance · called back', tag: 'Contacted', hot: false },
  { name: 'Appointment request', note: 'Clinic · this week', tag: 'Qualified', hot: false },
  { name: 'Project brief', note: 'Agency · follow up tomorrow', tag: 'Working', hot: false },
];

export default function PingList({ title = 'Pipeline', meta = '4 leads', rows = ROWS }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || process.env.NODE_ENV === 'test') return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.from('.ping-row', {
        y: 14,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        delay: 0.2,
        ease: 'power3.out',
      });
      gsap.to('.ping-pulse', {
        scale: 2.1,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: 'power1.out',
        transformOrigin: 'center center',
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="ping-board" ref={rootRef} aria-hidden="true">
      <div className="ping-chrome">
        <span className="ping-chrome-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <strong>{title}</strong>
        <span>{meta}</span>
      </div>
      <ul className="ping-rows">
        {rows.map((row) => (
          <li key={row.name} className={`ping-row${row.hot ? ' is-hot' : ''}`}>
            <span className="ping-dot">
              {row.hot ? <span className="ping-pulse" /> : null}
            </span>
            <span>
              <span className="ping-name">{row.name}</span>
              <span className="ping-note">{row.note}</span>
            </span>
            <span className={`ping-tag${row.hot ? '' : ' is-quiet'}`}>{row.tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
