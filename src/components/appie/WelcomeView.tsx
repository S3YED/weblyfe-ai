'use client';

// Post-Stripe success view. Subtle envelope-with-gold-seal illustration,
// 5s auto-redirect to /appie/auth/login, opt-out via "ik wacht hier" button.

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';
import CosmicBackdrop from './CosmicBackdrop';

const REDIRECT_MS = 5000;

type Props = {
  name?: string | null;
  sessionId?: string | null;
};

export default function WelcomeView({ name, sessionId: _ }: Props) {
  const router = useRouter();
  const [paused, setPaused] = useState(false);
  const [remaining, setRemaining] = useState(REDIRECT_MS);
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    if (paused) return;
    startRef.current = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const left = Math.max(0, REDIRECT_MS - elapsed);
      setRemaining(left);
      if (left <= 0) {
        clearInterval(tick);
        router.push('/appie/auth/login');
      }
    }, 100);
    return () => clearInterval(tick);
  }, [paused, router]);

  const greeting = name ? `Bedankt, ${name}` : 'Bedankt';
  const sec = Math.ceil(remaining / 1000);

  return (
    <main className="relative min-h-screen text-white">
      <CosmicBackdrop intensity="medium" />
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <EnvelopeWithSeal />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-5"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#DFB771]">Welkom bij Instant Appie</p>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">{greeting}.</h1>
          <p className="mx-auto max-w-md text-[15px] leading-relaxed text-white/65">
            We sturen je nu een setup-link via mail. Check je inbox, klik op de knop, en je Appie staat over 30 seconden aan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <Link
            href="/appie/auth/login"
            className="inline-flex h-14 items-center gap-3 rounded-full bg-[#DFB771] px-7 text-[15px] font-bold tracking-tight text-[#031D16] shadow-[0_18px_50px_-15px_rgba(223,183,113,0.7)] transition hover:bg-[#e8c889]"
          >
            Ik check mijn inbox
            <ArrowRight size={18} />
          </Link>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="text-[12px] uppercase tracking-[0.18em] text-white/40 transition hover:text-white/70"
          >
            {paused ? 'Hervat redirect' : `Doorsturen over ${sec}s · pauzeer`}
          </button>
        </motion.div>

        <p className="mt-16 inline-flex items-center gap-2 text-xs text-white/40">
          <Sparkles size={12} className="text-[#DFB771]" />
          Geen mail ontvangen? Check spam, of vraag op /appie/auth/login een nieuwe link aan.
        </p>
      </div>
    </main>
  );
}

function EnvelopeWithSeal() {
  return (
    <div className="relative">
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full bg-[#DFB771]/15 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex h-32 w-32 items-center justify-center rounded-3xl border border-[#DFB771]/30 bg-gradient-to-br from-[#DFB771]/15 to-transparent backdrop-blur-xl"
      >
        <Mail className="h-14 w-14 text-[#DFB771]" strokeWidth={1.4} />
        <motion.span
          aria-hidden
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 220, damping: 14 }}
          className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#DFB771] text-[#031D16] shadow-[0_10px_25px_-10px_rgba(223,183,113,0.8)]"
        >
          <Sparkles size={16} strokeWidth={2.4} />
        </motion.span>
      </motion.div>
    </div>
  );
}
