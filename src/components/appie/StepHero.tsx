'use client';

// Hero illustration for each wizard step.
// Large lucide icon with gold accent + soft glow + gentle floating motion.
// Mobile: appears above form. Desktop: lives in the left half.

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type Props = {
  icon: LucideIcon;
  kicker: string;
  caption: string;
};

export default function StepHero({ icon: Icon, kicker, caption }: Props) {
  return (
    <div className="relative flex flex-col items-start gap-6 sm:items-start">
      <div className="relative">
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full bg-[#DFB771]/20 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-[#DFB771]/30 bg-gradient-to-br from-[#DFB771]/15 to-transparent backdrop-blur-xl sm:h-28 sm:w-28"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon className="h-12 w-12 text-[#DFB771] sm:h-14 sm:w-14" strokeWidth={1.4} />
        </motion.div>
      </div>
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#DFB771]">{kicker}</p>
        <p className="text-sm text-white/55">{caption}</p>
      </div>
    </div>
  );
}
