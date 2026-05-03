'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Bell, Sparkles, ArrowRight, Clock } from 'lucide-react';

function getTimeLeft(target: number) {
  const now = Date.now();
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-b from-[#0E3D31] to-[#031D16] border border-[#247459]/30 flex items-center justify-center shadow-lg shadow-black/20">
        <span className="text-3xl md:text-4xl font-bold text-[#F6FEFC] tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
        {/* Shine line */}
        <div className="absolute top-1/2 left-2 right-2 h-px bg-gradient-to-r from-transparent via-[#247459]/20 to-transparent" />
      </div>
      <span className="text-xs md:text-sm text-[#F6FEFC]/40 mt-2 uppercase tracking-wider font-medium">{label}</span>
    </div>
  );
}

export default function CountdownHero() {
  // 72 hours from a fixed launch time - set this to your actual launch timestamp
  const [launchTime] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('weblyfe_launch_ts');
      if (stored) return parseInt(stored);
      const ts = Date.now() + 72 * 60 * 60 * 1000;
      localStorage.setItem('weblyfe_launch_ts', String(ts));
      return ts;
    }
    return Date.now() + 72 * 60 * 60 * 1000;
  });

  const [time, setTime] = useState(getTimeLeft(launchTime));
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(launchTime)), 1000);
    return () => clearInterval(id);
  }, [launchTime]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: connect to your email service (Resend, Mailchimp, etc.)
    console.log('Notify email:', email);
    setSubmitted(true);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#031D16]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#031D16] via-[#0E3D31] to-[#031D16]" />

      {/* Animated organic shapes */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-[15%] w-64 h-64 rounded-full bg-gradient-to-br from-[#DFB771]/30 to-[#FFD99A]/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-32 left-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-[#247459]/30 to-[#0E3D31]/20 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#247459]/10 to-transparent blur-3xl"
      />

      {/* Diamond decorations */}
      <div className="absolute top-40 left-20 w-3 h-3 bg-[#DFB771] rotate-45 hidden md:block" />
      <div className="absolute bottom-40 right-32 w-2 h-2 bg-[#DFB771] rotate-45 hidden md:block" />
      <div className="absolute top-1/3 right-20 w-4 h-4 bg-[#FFD99A]/60 rotate-45 hidden md:block" />

      <div className="container relative z-10 text-center px-6 pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#DFB771]/40 bg-[#DFB771]/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#DFB771]" />
          <span className="text-sm text-[#DFB771] font-medium">Something big is coming</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#F6FEFC] mb-6 leading-[1.1]"
        >
          We&apos;re Launching<br />
          <span className="text-gradient">Something New</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-[#F6FEFC]/70 max-w-3xl mx-auto mb-14 leading-relaxed"
        >
          AI automation packages built for creators, agencies, and service businesses.{' '}
          <span className="text-[#DFB771] font-medium">
            Early supporters get exclusive launch pricing.
          </span>
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-4 md:gap-6 mb-14"
        >
          <CountdownUnit value={time.days} label="Days" />
          <div className="flex items-center text-[#DFB771]/40 text-2xl font-light mt-[-20px]">:</div>
          <CountdownUnit value={time.hours} label="Hours" />
          <div className="flex items-center text-[#DFB771]/40 text-2xl font-light mt-[-20px]">:</div>
          <CountdownUnit value={time.minutes} label="Minutes" />
          <div className="flex items-center text-[#DFB771]/40 text-2xl font-light mt-[-20px]">:</div>
          <CountdownUnit value={time.seconds} label="Seconds" />
        </motion.div>

        {/* Notification Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-md mx-auto"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-4 rounded-xl bg-[#0E3D31] border border-[#247459]/30 text-[#F6FEFC] placeholder-[#F6FEFC]/30 text-base focus:outline-none focus:border-[#DFB771]/50 focus:ring-2 focus:ring-[#DFB771]/10 transition-all"
              />
              <button
                type="submit"
                className="btn-primary group whitespace-nowrap"
              >
                <Bell className="w-4 h-4" />
                Notify Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#247459]/20 border border-[#247459]/30"
            >
              <div className="w-8 h-8 rounded-full bg-[#247459] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[#F6FEFC] font-medium">You&apos;re on the list! We&apos;ll notify you at launch.</span>
            </motion.div>
          )}

          <p className="flex items-center justify-center gap-2 text-[#F6FEFC]/40 text-sm mt-4">
            <Clock className="w-3.5 h-3.5" />
            Be the first to access launch pricing
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-[#F6FEFC]/30 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 bg-[#DFB771] rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Vertical brand watermark */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block">
        <span
          className="text-[#F6FEFC]/10 text-xs font-bold tracking-[0.3em] transform -rotate-180"
          style={{ writingMode: 'vertical-rl' }}
        >
          WEBLYFE.AI
        </span>
      </div>
    </section>
  );
}
