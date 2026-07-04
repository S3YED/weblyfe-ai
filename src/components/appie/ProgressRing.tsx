'use client';

// Large circular progress ring (320px) for the provisioning page.
// Gold stroke, pulsing inner glow, percent + active step label inside.

import { motion } from 'framer-motion';

type Props = {
  percent: number; // 0..100
  stepLabel: string;
  etaSeconds: number | null;
  online: boolean;
};

export default function ProgressRing({ percent, stepLabel, etaSeconds, online }: Props) {
  const size = 320;
  const stroke = 6;
  const radius = size / 2 - stroke;
  const circumference = 2 * Math.PI * radius;
  const dash = (percent / 100) * circumference;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#fdd38a]/12 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg viewBox={`0 0 ${size} ${size}`} className="relative h-full w-full -rotate-90">
        <defs>
          <linearGradient id="progress-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdd38a" />
            <stop offset="100%" stopColor="#dfb771" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(162,208,191,0.10)"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progress-stroke)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          initial={false}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        <p className="hud-mono text-[10px] uppercase tracking-[0.22em] text-[#fdd38a] hud-glow-text">
          {online ? 'DEPLOYED' : 'DEPLOYING'}
        </p>
        <p className="mt-3 hud-mono text-6xl font-bold tracking-tight text-[#cce9dd] tabular-nums sm:text-7xl">
          {Math.round(percent)}
          <span className="ml-1 text-2xl text-[#a2d0bf]/45">%</span>
        </p>
        <p className="mt-3 max-w-[18ch] text-sm text-[#a2d0bf]/80" data-testid="ring-step-label">
          {stepLabel}
        </p>
        {etaSeconds !== null && !online ? (
          <p className="mt-1 hud-mono text-[11px] uppercase tracking-[0.18em] text-[#a2d0bf]/40">
            ETA ~{etaSeconds}s
          </p>
        ) : null}
      </div>
    </div>
  );
}
