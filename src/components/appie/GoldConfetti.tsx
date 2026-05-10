'use client';

// Subtle gold/cream confetti burst on provisioning completion.
// Uses canvas-confetti (already a dep). Two short bursts, no looping.
// Respects prefers-reduced-motion.

import { useEffect } from 'react';

type Props = {
  fire: boolean;
};

export default function GoldConfetti({ fire }: Props) {
  useEffect(() => {
    if (!fire) return;
    let cancelled = false;
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    (async () => {
      try {
        const mod = await import('canvas-confetti');
        const confetti = mod.default;
        if (cancelled) return;
        const colors = ['#DFB771', '#FFD99A', '#F6FEFC'];
        confetti({
          particleCount: 60,
          spread: 70,
          startVelocity: 32,
          ticks: 220,
          gravity: 0.9,
          scalar: 0.8,
          origin: { x: 0.5, y: 0.4 },
          colors,
        });
        setTimeout(() => {
          if (cancelled) return;
          confetti({
            particleCount: 40,
            spread: 90,
            startVelocity: 26,
            ticks: 200,
            gravity: 0.9,
            scalar: 0.7,
            origin: { x: 0.5, y: 0.45 },
            colors,
          });
        }, 250);
      } catch {
        // confetti is best-effort
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fire]);
  return null;
}
