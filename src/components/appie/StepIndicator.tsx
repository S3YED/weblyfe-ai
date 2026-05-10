'use client';

// 5-dot step indicator for the Appie setup wizard.
// Past dots: gold filled with check icon.
// Active dot: gold filled, animated pulse halo.
// Future dots: low-opacity outline.

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

type Props = {
  total: number;
  current: number; // 1-indexed
};

export default function StepIndicator({ total, current }: Props) {
  return (
    <div className="flex items-center gap-2 sm:gap-3" role="list" aria-label={`Stap ${current} van ${total}`}>
      {Array.from({ length: total }).map((_, i) => {
        const idx = i + 1;
        const isPast = idx < current;
        const isActive = idx === current;
        return (
          <div key={idx} className="flex items-center gap-2 sm:gap-3" role="listitem">
            <div className="relative flex h-7 w-7 items-center justify-center sm:h-8 sm:w-8">
              {isActive ? (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[#DFB771]/30"
                  animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
              ) : null}
              <span
                className={`relative flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold transition sm:h-6 sm:w-6 ${
                  isPast
                    ? 'bg-[#DFB771] text-[#031D16]'
                    : isActive
                    ? 'bg-[#DFB771] text-[#031D16] shadow-[0_0_18px_rgba(223,183,113,0.55)]'
                    : 'border border-white/25 bg-transparent text-white/40'
                }`}
              >
                {isPast ? <Check size={12} strokeWidth={3} /> : idx}
              </span>
            </div>
            {idx < total ? (
              <span
                aria-hidden
                className={`block h-px w-6 sm:w-8 ${isPast ? 'bg-[#DFB771]/60' : 'bg-white/10'}`}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
