'use client';

// Cinematic Appie backdrop. Used by /appie/setup, /appie/setup/provisioning,
// /appie/dashboard, /appie/welcome, /appie/auth/login.
// Deep forest base + slow-shifting gold nebula + faint dot grid + low-opacity grain.
// Pure decoration, no interactivity. Mobile-safe (no heavy filters).

import { motion } from 'framer-motion';

type Props = {
  intensity?: 'low' | 'medium' | 'high';
};

export default function CosmicBackdrop({ intensity = 'medium' }: Props) {
  const goldOpacity = intensity === 'low' ? 0.08 : intensity === 'high' ? 0.22 : 0.14;
  const greenOpacity = intensity === 'low' ? 0.18 : intensity === 'high' ? 0.32 : 0.24;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#031D16]">
      <motion.div
        className="absolute -right-40 -top-40 h-[60vmax] w-[60vmax] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, rgba(223,183,113,${goldOpacity}) 0%, transparent 65%)` }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-60 -left-40 h-[55vmax] w-[55vmax] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, rgba(36,116,89,${greenOpacity}) 0%, transparent 65%)` }}
        animate={{ x: [0, -30, 20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #DFB771 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
