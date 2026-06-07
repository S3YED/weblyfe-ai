'use client';

// Aetheris HUD hero for each wizard step.
// Bracket-framed icon module + mono kicker label + mint caption.
// Mobile: appears above form. Desktop: lives in the left half.

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import HudFrame from './HudFrame';

type Props = {
  icon: LucideIcon;
  kicker: string;
  caption: string;
};

export default function StepHero({ icon: Icon, kicker, caption }: Props) {
  return (
    <div className="relative flex flex-col items-start gap-6">
      <div className="relative">
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full bg-[#fdd38a]/15 blur-3xl"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <HudFrame
          active
          className="relative flex h-24 w-24 items-center justify-center hud-panel sm:h-28 sm:w-28"
        >
          <Icon className="h-11 w-11 text-[#fdd38a] sm:h-12 sm:w-12" strokeWidth={1.3} />
        </HudFrame>
      </div>
      <div className="space-y-2">
        <p className="hud-mono text-[11px] uppercase tracking-[0.2em] text-[#fdd38a]">
          {kicker}
        </p>
        <p className="text-sm leading-relaxed text-[#a2d0bf]">{caption}</p>
      </div>
    </div>
  );
}
