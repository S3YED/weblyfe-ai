'use client';

// Decorative Google Calendar mini-grid that animates in on step 5.
// 7 columns x 4 rows. A few cells light up gold to suggest "Appie plant je dag in".

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const HIGHLIGHTS = new Set([3, 9, 14, 18, 23]);

export default function CalendarPreview() {
  const cells = Array.from({ length: 28 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl"
    >
      <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/55">
        <Calendar size={14} className="text-[#DFB771]" />
        Google Calendar
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((_, i) => {
          const highlight = HIGHLIGHTS.has(i);
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.04 * i, duration: 0.25 }}
              className={`block aspect-square rounded-md ${
                highlight ? 'bg-[#DFB771]/70' : 'bg-white/[0.06]'
              }`}
            />
          );
        })}
      </div>
      <p className="mt-3 text-[11px] text-white/45">
        Voorbeeld. Appie leest je agenda en stelt slots voor.
      </p>
    </motion.div>
  );
}
