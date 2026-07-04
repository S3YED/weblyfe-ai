'use client';

// Aetheris HUD step indicator for the Appie setup wizard.
// Tactical segmented rail: filled gold segments for done/active steps,
// faint mint outline for pending. Mono SEQ counter sits alongside.

import { motion } from 'framer-motion';

type Props = {
  total: number;
  current: number; // 1-indexed
};

export default function StepIndicator({ total, current }: Props) {
  return (
    <div
      className="flex items-center gap-2"
      role="list"
      aria-label={`Stap ${current} van ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const idx = i + 1;
        const isPast = idx < current;
        const isActive = idx === current;
        return (
          <div key={idx} className="relative h-[3px] w-7 sm:w-9" role="listitem">
            <span className="absolute inset-0 rounded-full bg-[#a2d0bf]/15" />
            {isPast ? (
              <span className="absolute inset-0 rounded-full bg-[#dfb771]/70" />
            ) : isActive ? (
              <motion.span
                className="absolute inset-0 rounded-full bg-[#fdd38a] hud-glow-box"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
