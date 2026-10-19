import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../gsapSetup';

const ROWS = [
  { name: 'Northwind', note: 'Proposal quiet for 6 days', tag: 'Due', hot: true },
  { name: 'Lumen & Co', note: 'Handoff to onboarding', tag: 'Ping', hot: false },
  { name: 'Harbor Labs', note: 'No post in 14 days', tag: 'Watch', hot: false },
  { name: 'Atlas Freight', note: 'Call recap is on the record', tag: 'Clear', hot: false },
];

export default function PingList() {
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
      <div className="ping-board-head">
        <strong>Today’s ping list</strong>
        <span>4 open</span>
      </div>
      <ul className="ping-rows">
        {ROWS.map((row) => (
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
