'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

export default function WaitlistForm({ package: pkg, variant = 'dark' }: { package?: string; variant?: 'dark' | 'light' } = {}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const phoneRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itiRef = useRef<any>(null);

  useEffect(() => {
    if (!phoneRef.current) return;

    let iti: ReturnType<typeof import('intl-tel-input')['default']> | null = null;

    import('intl-tel-input').then((mod) => {
      if (!phoneRef.current) return;
      iti = mod.default(phoneRef.current, {
        initialCountry: 'nl',
        countryOrder: ['nl', 'be', 'de', 'gb', 'us', 'th'],
        separateDialCode: true,
        loadUtils: () => import('intl-tel-input/utils'),
        containerClass: 'iti-waitlist',
      });
      itiRef.current = iti;
    });

    return () => {
      if (iti && typeof iti.destroy === 'function') iti.destroy();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMsg('');

    let formattedPhone = phone;
    if (itiRef.current && typeof itiRef.current.getNumber === 'function') {
      formattedPhone = itiRef.current.getNumber() || phone;
    }

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: email.toLowerCase().trim(),
          phone: formattedPhone,
          package: pkg,
        }),
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
      <div className="flex flex-col items-center gap-3 py-6">
        <CheckCircle className="w-12 h-12 text-[#DFB771]" />
        <p className={`font-semibold text-xl ${variant === 'light' ? 'text-[#031D16]' : 'text-[#F6FEFC]'}`}>You&apos;re on the list!</p>
        <p className={`text-sm ${variant === 'light' ? 'text-[#031D16]/55' : 'text-[#F6FEFC]/55'}`}>We&apos;ll notify you first when pricing drops.</p>
      </div>
    );
  }

  const isDark = variant === 'dark';
  const inputBase = 'w-full h-[52px] px-4 rounded-xl border text-[16px] leading-tight focus:outline-none focus:ring-2 transition-all duration-200';
  const inputTheme = isDark
    ? 'bg-[#0E3D31]/60 border-[#F6FEFC]/10 text-[#F6FEFC] placeholder-[#F6FEFC]/30 focus:border-[#DFB771]/50 focus:ring-[#DFB771]/20'
    : 'bg-white border-[#031D16]/15 text-[#031D16] placeholder-[#031D16]/40 focus:border-[#247459] focus:ring-[#247459]/20';

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@26.8.1/build/css/intlTelInput.css" />
      <style>{`
        .iti-waitlist { width: 100% !important; }
        .iti-waitlist .iti__selected-dial-code { color: ${isDark ? '#F6FEFC' : '#031D16'}; font-size: 16px; }
        .iti-waitlist .iti__arrow { border-top-color: ${isDark ? '#F6FEFC' : '#031D16'}; }
        .iti-waitlist .iti__flag-container { padding-left: 12px; }
        .iti-waitlist .iti__selected-country-primary { background: transparent !important; }
        .iti-waitlist .iti__country-list { background: #0E3D31; border-color: #247459; border-radius: 12px; margin-top: 4px; }
        .iti-waitlist .iti__country { color: #F6FEFC; padding: 10px 12px; }
        .iti-waitlist .iti__country:hover, .iti-waitlist .iti__country--highlight { background: #247459; }
        .iti-waitlist .iti__dial-code { color: #DFB771; }
        .iti-waitlist .iti__search-input { background: #0E3D31; color: #F6FEFC; border-color: #247459; border-radius: 8px; font-size: 16px; padding: 10px 12px; }
      `}</style>

      <div className="flex flex-col gap-3">
        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="First name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${inputBase} ${inputTheme}`}
            autoComplete="given-name"
          />
          <input
            type="email"
            placeholder="Your email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`${inputBase} ${inputTheme}`}
            autoComplete="email"
          />
        </div>

        {/* Row 2: Phone (full width) */}
        <input
          ref={phoneRef}
          type="tel"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`${inputBase} ${inputTheme}`}
          autoComplete="tel"
        />

        {/* Row 3: Submit button (full width) */}
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className="w-full h-[52px] rounded-xl font-semibold text-[16px] transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#DFB771] to-[#C9A45C] text-[#031D16] shadow-lg shadow-[#DFB771]/20 hover:shadow-xl hover:shadow-[#DFB771]/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>Notify Me <ArrowRight className="w-5 h-5" /></>
          )}
        </button>
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm mt-3 text-center">{errorMsg}</p>
      )}
    </form>
  );
}
