'use client';

// Tiny "Opgeslagen" indicator that pulses in/out whenever wizard state changes.
// Cosmetic only — actual persistence is handled by the wizard's localStorage hook.

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

type Props = {
  trigger: unknown; // any value whose change indicates a save just happened
};

export default function SavedIndicator({ trigger }: Props) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <div className="h-4 text-[11px] text-white/45" aria-live="polite">
      <AnimatePresence>
        {visible ? (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center gap-1"
          >
            <Cloud size={11} className="text-[#DFB771]" />
            Opgeslagen
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
