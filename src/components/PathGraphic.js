import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../gsapSetup';

const PATH =
  'M70 620 C 130 540, 170 500, 210 430 S 290 280, 360 330 S 470 470, 540 300 S 640 90, 730 70';

export default function PathGraphic() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const path = root.querySelector('.path-main');
    const traveler = root.querySelector('.traveler');
    const nodes = root.querySelectorAll('.node-group');
    const labels = root.querySelectorAll('.path-label');
    if (!path || typeof path.getTotalLength !== 'function') return undefined;

    let length = 0;
    try {
      length = path.getTotalLength();
    } catch {
      return undefined;
    }
    if (!length) return undefined;

    const ctx = gsap.context(() => {
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set([nodes, labels, traveler], { opacity: 0 });

      const intro = gsap.timeline({ defaults: { ease: 'power2.out' } });
      intro
        .to(path, { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut' })
        .to(nodes, { opacity: 1, stagger: 0.12, duration: 0.4 }, '-=1.2')
        .to(labels, { opacity: 1, stagger: 0.12, duration: 0.35 }, '-=0.9')
        .to(traveler, { opacity: 1, duration: 0.2 }, '-=0.5');

      gsap.to(traveler, {
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        duration: 7,
        ease: 'none',
        repeat: -1,
      });

      gsap.to('.path-ghost', {
        strokeDashoffset: -80,
        duration: 6,
        repeat: -1,
        ease: 'none',
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="path-wrap" ref={rootRef} aria-hidden="true">
      <svg className="path-svg" viewBox="0 0 800 720">
        <defs>
          <linearGradient id="pathGlow" x1="0" y1="720" x2="800" y2="0">
            <stop offset="0%" stopColor="#7eb6f5" />
            <stop offset="55%" stopColor="#1a6fd4" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        {[120, 240, 360, 480, 600].map((y) => (
          <line key={y} className="path-grid" x1="40" y1={y} x2="760" y2={y} />
        ))}
        {[160, 320, 480, 640].map((x) => (
          <line key={x} className="path-grid" x1={x} y1="40" x2={x} y2="680" />
        ))}
        <path className="path-ghost" d={PATH} />
        <path className="path-main" d={PATH} />
        <g className="node-group">
          <circle className="node" cx="70" cy="620" r="11" />
          <circle className="node-core" cx="70" cy="620" r="4" />
          <text className="path-label" x="90" y="650">
            Discover
          </text>
        </g>
        <g className="node-group">
          <circle className="node" cx="210" cy="430" r="11" />
          <circle className="node-core" cx="210" cy="430" r="4" />
          <text className="path-label" x="228" y="415">
            Design
          </text>
        </g>
        <g className="node-group">
          <circle className="node" cx="360" cy="330" r="11" />
          <circle className="node-core" cx="360" cy="330" r="4" />
          <text className="path-label" x="378" y="318">
            Build
          </text>
        </g>
        <g className="node-group">
          <circle className="node" cx="540" cy="300" r="11" />
          <circle className="node-core" cx="540" cy="300" r="4" />
          <text className="path-label" x="558" y="286">
            Launch
          </text>
        </g>
        <g className="node-group">
          <circle className="node" cx="730" cy="70" r="11" />
          <circle className="node-core" cx="730" cy="70" r="4" />
          <text className="path-label" x="620" y="58">
            Scale
          </text>
        </g>
        <circle className="traveler" r="6" cx="70" cy="620" />
      </svg>
    </div>
  );
}
