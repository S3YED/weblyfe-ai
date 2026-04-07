'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';

export default function LoginClient() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/appie/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to send magic link.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ background: 'linear-gradient(180deg, #031D16 0%, #0E3D31 100%)' }}>
      <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-20 right-[10%] w-72 h-72 rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #DFB771, transparent)' }} />

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo-gold.svg" alt="Weblyfe" className="h-7 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#F6FEFC]">Welcome back</h1>
          <p className="text-[#F6FEFC]/50 mt-2">Sign in to your Appie dashboard</p>
        </div>

        <div className="rounded-3xl p-8"
          style={{ background: 'rgba(14,61,49,0.4)', border: '1px solid rgba(36,116,89,0.3)', backdropFilter: 'blur(20px)' }}>

          {status === 'success' ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'rgba(36,116,89,0.2)', border: '2px solid #247459' }}>
                <CheckCircle2 className="w-8 h-8 text-[#247459]" />
              </div>
              <h2 className="text-xl font-bold text-[#DFB771] mb-2">Check your email!</h2>
              <p className="text-[#F6FEFC]/60 text-sm mb-4">
                We sent a login link to <span className="text-[#F6FEFC] font-medium">{email}</span>
              </p>
              <p className="text-xs text-[#F6FEFC]/30 mb-6">The link expires in 15 minutes.</p>
              <button onClick={() => setStatus('idle')} className="text-sm text-[#247459] hover:underline">
                Try a different email
              </button>
            </motion.div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#F6FEFC]/70 mb-2">Your email address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F6FEFC]/30" />
                    <input
                      type="email" value={email} onChange={(e) => { setEmail(e.target.value); setStatus('idle'); setErrorMsg(''); }}
                      placeholder="you@example.com" required autoFocus
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl text-[#F6FEFC] text-sm transition-all duration-200"
                      style={{ background: 'rgba(36,116,89,0.1)', border: '2px solid rgba(36,116,89,0.3)', outline: 'none' }}
                    />
                  </div>
                </div>
                {status === 'error' && <p className="text-red-400 text-sm text-center">{errorMsg}</p>}
                <button
                  type="submit" disabled={status === 'loading' || !email}
                  className="w-full py-4 rounded-xl font-semibold text-[#031D16] flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #DFB771, #C9A45C)', boxShadow: '0 4px 24px rgba(223,183,113,0.2)' }}
                >
                  {status === 'loading' ? (<><Loader2 className="w-5 h-5 animate-spin" /> Sending link...</>) : (<>Send Magic Link <ArrowRight className="w-5 h-5" /></>)}
                </button>
              </form>
              <p className="text-xs text-[#F6FEFC]/20 text-center mt-6">No password needed. Just your email.</p>
            </>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-[#F6FEFC]/30 hover:text-[#F6FEFC]/60 transition-colors">← Back to weblyfe.ai</Link>
        </div>
      </div>
    </div>
  );
}
