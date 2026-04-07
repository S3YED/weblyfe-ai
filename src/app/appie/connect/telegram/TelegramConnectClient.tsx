'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Loader2, AlertCircle, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';

type Step = 1 | 2 | 3;
type Status = 'idle' | 'validating' | 'valid' | 'invalid';

function StepIndicator({ current }: { current: Step }) {
  const steps = ['Create Bot', 'Paste Token', 'Test It'];
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((label, i) => {
        const num = (i + 1) as Step;
        const done = num < current;
        const active = num === current;
        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
              style={{
                background: done ? '#247459' : active ? 'rgba(36,116,89,0.3)' : 'rgba(36,116,89,0.1)',
                border: active ? '2px solid #247459' : 'none',
                color: done ? '#fff' : active ? '#DFB771' : 'rgba(246,254,252,0.3)',
              }}
            >
              {done ? <CheckCircle2 className="w-4 h-4" /> : num}
            </div>
            <span
              className="text-xs font-medium hidden sm:block"
              style={{ color: done || active ? 'rgba(246,254,252,0.7)' : 'rgba(246,254,252,0.3)' }}
            >
              {label}
            </span>
            {i < 2 && (
              <div
                className="w-8 h-px mx-1"
                style={{ background: done ? '#247459' : 'rgba(36,116,89,0.2)' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Step1({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-2xl font-bold text-[#F6FEFC] mb-2 text-center">
        Create your Telegram bot
      </h2>
      <p className="text-[#F6FEFC]/50 text-center mb-8">
        Appie needs a bot to chat with you. Here&apos;s how to create one.
      </p>

      <div className="space-y-4 mb-8">
        {[
          {
            n: 1,
            title: 'Open BotFather',
            desc: 'In Telegram, search for @BotFather and tap Start.',
            action: { label: 'Open BotFather', href: 'https://t.me/BotFather', icon: '🚀' },
          },
          { n: 2, title: 'Create a new bot', desc: 'Send the message:', code: '/newbot' },
          { n: 3, title: 'Choose a name', desc: 'Pick something like "My Business Assistant".' },
          { n: 4, title: 'Choose a username', desc: 'Pick a username ending in "bot" — e.g., mybusiness_appie_bot.' },
        ].map((step) => (
          <div
            key={step.n}
            className="flex gap-4 p-4 rounded-xl"
            style={{ background: 'rgba(36,116,89,0.1)', border: '1px solid rgba(36,116,89,0.2)' }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold" style={{ background: '#247459', color: '#fff' }}>
              {step.n}
            </div>
            <div className="flex-1">
              <p className="text-[#F6FEFC] font-semibold text-sm">{step.title}</p>
              <p className="text-[#F6FEFC]/50 text-sm mt-0.5">{step.desc}</p>
              {step.code && (
                <div className="mt-2 px-3 py-2 rounded-lg text-sm font-mono" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(36,116,89,0.3)' }}>
                  /newbot
                </div>
              )}
              {step.action && (
                <a href={step.action.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-[#DFB771] hover:underline">
                  {step.action.icon} {step.action.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl font-semibold text-[#031D16] flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
        style={{ background: 'linear-gradient(135deg, #DFB771, #C9A45C)', boxShadow: '0 4px 24px rgba(223,183,113,0.2)' }}
      >
        Got my bot created
        <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function Step2({ sessionId, onSuccess }: { sessionId: string; onSuccess: (botUsername: string, botName: string) => void }) {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [botInfo, setBotInfo] = useState<{ username: string; name: string } | null>(null);
  const isValidFormat = /^\d{8,10}:[A-Za-z0-9_-]{22,35}$/.test(token.trim());

  const handleValidate = useCallback(async () => {
    if (!isValidFormat) {
      setStatus('invalid');
      setErrorMsg("That doesn&apos;t look like a valid bot token.");
      return;
    }
    setStatus('validating');
    setErrorMsg('');
    try {
      const res = await fetch('/api/appie/connect/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, bot_token: token.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('valid');
        setBotInfo({ username: data.bot_username, name: data.bot_name });
        setTimeout(() => onSuccess(data.bot_username, data.bot_name), 1200);
      } else {
        setStatus('invalid');
        setErrorMsg(data.error || 'Failed to connect bot.');
      }
    } catch {
      setStatus('invalid');
      setErrorMsg('Connection error.');
    }
  }, [token, isValidFormat, sessionId, onSuccess]);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-2xl font-bold text-[#F6FEFC] mb-2 text-center">Connect your bot</h2>
      <p className="text-[#F6FEFC]/50 text-center mb-8">Paste the token BotFather gave you below.</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[#F6FEFC]/70 mb-2">Bot Token from @BotFather</label>
        <input
          type="text"
          value={token}
          onChange={(e) => { setToken(e.target.value); setStatus('idle'); setErrorMsg(''); }}
          placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
          className="w-full px-4 py-3.5 rounded-xl text-[#F6FEFC] text-sm font-mono transition-all duration-200"
          style={{
            background: 'rgba(36,116,89,0.1)',
            border: status === 'valid' ? '2px solid #247459' : status === 'invalid' ? '2px solid #dc2626' : '2px solid rgba(36,116,89,0.3)',
            outline: 'none',
          }}
          autoFocus autoComplete="off" spellCheck={false}
        />
      </div>

      <div className="min-h-[48px] mb-6">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-sm text-[#F6FEFC]/30 text-center py-2">
              Token format: looks {isValidFormat ? 'valid ✓' : 'incorrect so far'}
            </motion.p>
          )}
          {status === 'validating' && (
            <motion.div key="validating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 py-2">
              <Loader2 className="w-4 h-4 text-[#DFB771] animate-spin" />
              <span className="text-sm text-[#DFB771]">Validating your bot token...</span>
            </motion.div>
          )}
          {status === 'valid' && botInfo && (
            <motion.div key="valid" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 py-2 text-[#247459]">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Connected! Bot @{botInfo.username} is alive.</span>
            </motion.div>
          )}
          {status === 'invalid' && (
            <motion.div key="invalid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-start justify-center gap-2 py-2 px-2" style={{ color: '#dc2626' }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={handleValidate}
        disabled={!token.trim() || status === 'validating'}
        className="w-full py-4 rounded-xl font-semibold text-[#031D16] flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg, #DFB771, #C9A45C)', boxShadow: '0 4px 24px rgba(223,183,113,0.2)' }}
      >
        {status === 'validating' ? (<><Loader2 className="w-5 h-5 animate-spin" /> Validating...</>) : (<>Connect Bot <ArrowRight className="w-5 h-5" /></>)}
      </button>

      <div className="mt-4 p-4 rounded-xl text-sm text-[#F6FEFC]/40" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <p className="font-semibold text-[#F6FEFC]/60 mb-1">Where do I find my token?</p>
        <p>After creating your bot, BotFather shows a token like this:</p>
        <div className="mt-2 px-3 py-2 rounded-lg font-mono text-xs" style={{ background: 'rgba(36,116,89,0.15)' }}>
          123456789:ABCdefGHIjklMNOpqrsTUVwxyz
        </div>
        <p className="mt-2">Copy the whole thing — it&apos;s between the numbers and the colon.</p>
      </div>
    </motion.div>
  );
}

function Step3({ botUsername, onDone }: { botUsername: string; onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => { window.open(`https://t.me/${botUsername}`, '_blank'); }, 1500);
    return () => clearTimeout(timer);
  }, [botUsername]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
        style={{ background: 'rgba(36,116,89,0.2)', border: '2px solid #247459' }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="#247459">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      </motion.div>

      <h2 className="text-2xl font-bold text-[#DFB771] mb-2">Say hello to your Appie!</h2>
      <p className="text-[#F6FEFC]/70 mb-8">Your bot @{botUsername} is connected. Open it and send any message.</p>

      <div className="mb-8 p-6 rounded-2xl text-left" style={{ background: 'rgba(36,116,89,0.1)', border: '1px solid rgba(36,116,89,0.3)' }}>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#DFB771] mb-3">What to try first</p>
        {[
          'Introduce yourself — tell Appie your name and what you do',
          'Ask: "What can you help me with?"',
          'Try: "Set a reminder for tomorrow at 9am"',
        ].map((tip, i) => (
          <div key={i} className="flex gap-3 items-start mt-3">
            <span className="text-lg flex-shrink-0">💬</span>
            <p className="text-sm text-[#F6FEFC]/80">{tip}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => { confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 }, colors: ['#247459', '#DFB771'] }); onDone(); }}
        className="w-full py-4 rounded-xl font-semibold text-[#031D16] flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 mb-3"
        style={{ background: 'linear-gradient(135deg, #DFB771, #C9A45C)', boxShadow: '0 4px 24px rgba(223,183,113,0.2)' }}
      >
        Done! Go to Dashboard
        <ArrowRight className="w-5 h-5" />
      </button>
      <Link href={`https://t.me/${botUsername}`} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-[#F6FEFC]/40 hover:text-[#247459] transition-colors">
        Open bot again <ExternalLink className="w-3 h-3" />
      </Link>
    </motion.div>
  );
}

export default function TelegramConnectClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [step, setStep] = useState<Step>(1);
  const [botUsername, setBotUsername] = useState('');
  const [botName, setBotName] = useState('');

  const handleSuccess = (username: string, name: string) => {
    setBotUsername(username);
    setBotName(name);
    setStep(3);
  };

  const handleDone = () => {
    confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 }, colors: ['#247459', '#DFB771', '#F6FEFC'] });
    window.location.href = '/appie/login';
  };

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#031D16' }}>
        <div className="text-center">
          <p className="text-[#F6FEFC]/60">No session found.</p>
          <Link href="/openclaw" className="mt-4 inline-block text-[#DFB771] hover:underline">← Back to OpenClaw</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{ background: 'linear-gradient(180deg, #031D16 0%, #0E3D31 100%)' }}>
      <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-20 right-[10%] w-72 h-72 rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #DFB771, transparent)' }} />

      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img src="/logo-gold.svg" alt="Weblyfe" className="h-7 mx-auto mb-4" />
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(36,116,89,0.2)', border: '1px solid rgba(36,116,89,0.4)' }}>
            <span className="text-[#247459]">Connect Telegram</span>
          </div>
        </div>

        {step > 1 && (
          <button onClick={() => setStep((s) => (s - 1) as Step)}
            className="flex items-center gap-1 text-sm text-[#F6FEFC]/40 hover:text-[#F6FEFC]/70 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}

        <div className="rounded-3xl p-8"
          style={{ background: 'rgba(14,61,49,0.4)', border: '1px solid rgba(36,116,89,0.3)', backdropFilter: 'blur(20px)' }}>
          <AnimatePresence mode="wait">
            {step === 1 && <Step1 key="1" onNext={() => setStep(2)} />}
            {step === 2 && <Step2 key="2" sessionId={sessionId} onSuccess={handleSuccess} />}
            {step === 3 && <Step3 key="3" botUsername={botUsername} onDone={handleDone} />}
          </AnimatePresence>
        </div>

        {step < 3 && <StepIndicator current={step} />}

        <p className="text-center text-xs text-[#F6FEFC]/20 mt-6">
          Your Telegram bot token is stored only on your private server. We never see it.
        </p>
      </div>
    </div>
  );
}
