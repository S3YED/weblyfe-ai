'use client';

// Decorative SVG waveform for the voice-tone step.
// Renders 24 gold bars whose heights tween in a wave pattern via Framer Motion.
// No audio plays. Pure visual rhetoric.

import { motion } from 'framer-motion';

type Props = {
  active: boolean;
  seed?: number; // varies the wave shape per option
};

export default function Waveform({ active, seed = 0 }: Props) {
  const bars = 24;
  return (
    <div className="flex h-7 items-center gap-[3px]" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => {
        const phase = (i / bars) * Math.PI * 2 + seed;
        const baseHeight = 4 + Math.abs(Math.sin(phase)) * 14;
        const peakHeight = 4 + Math.abs(Math.sin(phase + 0.6)) * 22;
        return (
          <motion.span
            key={i}
            className="block w-[2px] rounded-full bg-[#DFB771]/70"
            animate={
              active
                ? { height: [baseHeight, peakHeight, baseHeight] }
                : { height: 4 }
            }
            transition={
              active
                ? { duration: 1.1 + (i % 5) * 0.08, repeat: Infinity, ease: 'easeInOut', delay: (i % 6) * 0.05 }
                : { duration: 0.3 }
            }
            style={{ height: 4 }}
          />
        );
      })}
    </div>
  );
}
