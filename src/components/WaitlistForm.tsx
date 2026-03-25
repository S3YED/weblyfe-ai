'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Something went wrong. Try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <CheckCircle className="w-10 h-10 text-[#DFB771]" />
        <p className="text-[#F6FEFC] font-semibold text-lg">You&apos;re on the list!</p>
        <p className="text-[#F6FEFC]/55 text-sm">We&apos;ll notify you first when pricing drops.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-[#0E3D31]/60 border border-[#DFB771]/20 text-[#F6FEFC] placeholder-[#F6FEFC]/30 focus:outline-none focus:border-[#DFB771]/60 transition-colors text-sm"
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-lg bg-[#0E3D31]/60 border border-[#DFB771]/20 text-[#F6FEFC] placeholder-[#F6FEFC]/30 focus:outline-none focus:border-[#DFB771]/60 transition-colors text-sm"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="tel"
          placeholder="Phone number (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-[#0E3D31]/60 border border-[#DFB771]/20 text-[#F6FEFC] placeholder-[#F6FEFC]/30 focus:outline-none focus:border-[#DFB771]/60 transition-colors text-sm"
        />
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>Notify Me <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-1 w-full text-center">{errorMsg}</p>
      )}
    </form>
  );
}
