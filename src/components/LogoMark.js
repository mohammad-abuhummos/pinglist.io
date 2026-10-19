import { useId } from 'react';

export default function LogoMark() {
  const uid = useId().replace(/:/g, '');
  const ink = `pl-ink-${uid}`;
  const glow = `pl-glow-${uid}`;
  const clip = `pl-clip-${uid}`;

  return (
    <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id={ink} x1="4" y1="0" x2="28" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#343b4d" />
          <stop offset="0.55" stopColor="#1a1f2b" />
          <stop offset="1" stopColor="#10131a" />
        </linearGradient>
        <radialGradient id={glow} cx="26" cy="6" r="16" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2a4bff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#2a4bff" stopOpacity="0" />
        </radialGradient>
        <clipPath id={clip}>
          <rect width="32" height="32" rx="11" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="32" height="32" fill={`url(#${ink})`} />
        <rect width="32" height="32" fill={`url(#${glow})`} />
      </g>
      <rect
        x="0.7"
        y="0.7"
        width="30.6"
        height="30.6"
        rx="10.4"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.16"
        strokeWidth="1"
      />
      <path
        d="M9.7 23.8V8.65H13.35"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.75 10.38A4.5 4.5 0 1 1 9.7 13.15"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.7"
        strokeLinecap="round"
      />
      <path
        d="M15.9 4.15A9.15 9.15 0 0 1 20.7 6.7"
        fill="none"
        stroke="#c9d4ff"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <circle cx="17.15" cy="7.35" r="1.72" fill="#7f9bff" />
    </svg>
  );
}
