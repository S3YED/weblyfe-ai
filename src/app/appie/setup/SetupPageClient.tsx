'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Loader2, ChevronRight, Zap, Shield, Bot } from 'lucide-react';

interface Step {
  name: string;
  status: 'pending' | 'in_progress' | 'done' | 'failed';
}

interface ProvisionStatus {
  status: string;
  step: number;
  steps: Step[];
  progress: number;
  estimatedMinutes: number;
}

const STEPS = [
  'Creating your private server',
  'Installing AI capabilities',
  'Setting up security',
  'Personalizing your Appie',
  'Final checks',
];

const EXPLAINER_TIPS = [
  'Your Appie will be completely private — running on its own dedicated server.',
  'No one else can access your Appie. Not even us.',
  'Your data never leaves your server. Ever.',
  'Appie can handle emails, calendar, research, and much more.',
  "You'll connect Telegram in the next step — it takes about 2 minutes.",
];

function AppieLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #247459, #0E3D31)' }}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-4xl"
        >
          🧙🏽‍♂️
        </motion.div>
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-2xl"
          style={{ background: 'radial-gradient(circle, rgba(223,183,113,0.15) 0%, transparent 70%)' }}
        />
      </div>
    </div>
  );
}

function ProgressStep({ step, index }: { step: Step; index: number }) {
  const icons = [Bot, Zap, Shield, CheckCircle2, CheckCircle2];
  const Icon = icons[index];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start gap-4"
    >
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
          style={{
            background: step.status === 'done'
              ? '#247459'
              : step.status === 'in_progress'
              ? 'rgba(36,116,89,0.3)'
              : step.status === 'failed'
              ? '#dc2626'
              : 'rgba(36,116,89,0.1)',
            border: step.status === 'in_progress' ? '2px solid #247459' : 'none',
          }}
        >
          {step.status === 'done' ? (
            <CheckCircle2 className="w-5 h-5 text-white" />
          ) : step.status === 'in_progress' ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
              <Loader2 className="w-5 h-5 text-[#DFB771]" />
            </motion.div>
          ) : step.status === 'failed' ? (
            <span className="text-white text-lg">✕</span>
          ) : (
            <Icon className="w-5 h-5 text-[#247459]/40" />
          )}
        </div>
        {index < STEPS.length - 1 && (
          <div
            className="w-0.5 h-8 mt-1"
            style={{
              background: step.status === 'done' ? '#247459' : 'rgba(36,116,89,0.2)',
            }}
          />
        )}
      </div>
      <div className="pt-1.5">
        <p
          className="text-sm font-medium transition-colors duration-300"
          style={{
            color: step.status === 'done'
              ? '#247459'
              : step.status === 'in_progress'
              ? '#F6FEFC'
              : step.status === 'failed'
              ? '#dc2626'
              : 'rgba(246,254,252,0.4)',
          }}
        >
          {step.name}
        </p>
        {step.status === 'in_progress' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-[#DFB771] mt-0.5"
          >
            Working on it...
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

function ReadyState({ sessionId }: { sessionId: string }) {
  const [confettiFired, setConfettiFired] = useState(false);

  useEffect(() => {
    if (confettiFired) return;
    setConfettiFired(true);

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#247459', '#DFB771', '#F6FEFC'],
    });
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.7 },
        colors: ['#247459', '#DFB771'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.7 },
        colors: ['#247459', '#DFB771'],
      });
    }, 400);
  }, [confettiFired]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
        style={{ background: 'rgba(36,116,89,0.2)', border: '2px solid #247459' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        >
          <CheckCircle2 className="w-14 h-14 text-[#247459]" />
        </motion.div>
      </motion.div>

      <h2 className="text-3xl font-bold text-[#DFB771] mb-2">
        Your Appie is alive! 🎉
      </h2>
      <p className="text-[#F6FEFC]/70 text-lg mb-8">
        Your personal AI employee is ready. Let&apos;s connect your first channel.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={`/appie/connect/telegram?session_id=${sessionId}`}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-[#031D16] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #DFB771, #C9A45C)',
            boxShadow: '0 8px 32px rgba(223,183,113,0.25)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          Connect Telegram
          <ChevronRight className="w-5 h-5" />
        </Link>
        <button
          disabled
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-[#F6FEFC]/40 border border-[#F6FEFC]/10 cursor-not-allowed"
        >
          WhatsApp (coming soon)
        </button>
      </div>

      <p className="text-xs text-[#F6FEFC]/30 mt-6">
        Prefer to set up later?{' '}
        <Link href="/appie/login" className="text-[#247459] hover:underline">
          Access your dashboard
        </Link>
      </p>
    </motion.div>
  );
}

export default function SetupPageClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [status, setStatus] = useState<ProvisionStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tipIndex, setTipIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) return;
    const interval = setInterval(() => {
      setTipIndex(i => (i + 1) % EXPLAINER_TIPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isReady]);

  const fetchStatus = useCallback(async () => {
    if (!sessionId || isReady) return;
    try {
      const res = await fetch(`/api/appie/status?session_id=${sessionId}`);
      if (!res.ok) return;
      const data: ProvisionStatus = await res.json();
      setStatus(data);
      setError(null);
      if (
        data.status === 'ready' ||
        data.status === 'active' ||
        data.steps.every(s => s.status === 'done')
      ) {
        setIsReady(true);
      }
    } catch (err) {
      console.error('Failed to fetch status:', err);
    }
  }, [sessionId, isReady]);

  useEffect(() => {
    if (!sessionId) return;
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [sessionId, fetchStatus]);

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#031D16' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#F6FEFC] mb-4">Missing session</h1>
          <p className="text-[#F6FEFC]/60">No session ID found. Complete your purchase first.</p>
          <Link href="/openclaw" className="mt-6 inline-block text-[#DFB771] hover:underline">
            ← Back to OpenClaw
          </Link>
        </div>
      </div>
    );
  }

  if (isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#031D16' }}>
        <div className="max-w-lg mx-auto px-6">
          <div className="mb-8">
            <img src="/logo-gold.svg" alt="Weblyfe" className="h-8 mx-auto" />
          </div>
          <ReadyState sessionId={sessionId} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{ background: 'linear-gradient(180deg, #031D16 0%, #0E3D31 100%)' }}
    >
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-20 right-[10%] w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #DFB771, transparent)' }}
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="fixed bottom-20 left-[5%] w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #247459, transparent)' }}
      />

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img src="/logo-gold.svg" alt="Weblyfe" className="h-7 mx-auto mb-4" />
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(36,116,89,0.2)', border: '1px solid rgba(36,116,89,0.4)' }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#247459]"
            />
            <span className="text-[#247459]">Setting up your Appie</span>
          </div>
        </div>

        <div
          className="rounded-3xl p-8"
          style={{
            background: 'rgba(14,61,49,0.4)',
            border: '1px solid rgba(36,116,89,0.3)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex flex-col items-center mb-8">
            <AppieLogo />
            <h1 className="text-xl font-bold text-[#F6FEFC] mt-3">Your Appie is waking up</h1>
            <p className="text-sm text-[#F6FEFC]/50 mt-1">
              {status
                ? `About ${status.estimatedMinutes} minute${status.estimatedMinutes !== 1 ? 's' : ''} remaining`
                : 'Starting up...'}
            </p>
          </div>

          <div className="mb-8">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(36,116,89,0.2)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #247459, #DFB771)' }}
                animate={{ width: status ? `${status.progress}%` : '0%' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-[#F6FEFC]/30">0%</span>
              <span className="text-xs text-[#F6FEFC]/50 font-medium">
                {status ? `${status.progress}%` : '...'}
              </span>
              <span className="text-xs text-[#F6FEFC]/30">100%</span>
            </div>
          </div>

          <div className="space-y-0">
            {STEPS.map((stepName, i) => {
              const stepStatus = status?.steps[i]?.status || 'pending';
              return (
                <ProgressStep
                  key={stepName}
                  step={{ name: stepName, status: stepStatus as Step['status'] }}
                  index={i}
                />
              );
            })}
          </div>

          {error && (
            <div className="mt-6 p-4 rounded-xl text-sm text-red-300 text-center" style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)' }}>
              {error}
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={tipIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-[#F6FEFC]/40"
            >
              {EXPLAINER_TIPS[tipIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-[#F6FEFC]/20 mt-8">
          Having trouble?{' '}
          <a href="mailto:hello@weblyfe.ai" className="text-[#247459] hover:underline">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
