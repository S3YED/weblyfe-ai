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

    // Get formatted phone from intl-tel-input
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
      <div className="flex flex-col items-center gap-3 py-4">
        <CheckCircle className="w-10 h-10 text-[#DFB771]" />
        <p className={`font-semibold text-lg ${variant === 'light' ? 'text-[#031D16]' : 'text-[#F6FEFC]'}`}>You&apos;re on the list!</p>
        <p className={`text-sm ${variant === 'light' ? 'text-[#031D16]/55' : 'text-[#F6FEFC]/55'}`}>We&apos;ll notify you first when pricing drops.</p>
      </div>
    );
  }

  const inputDark = 'bg-[#0E3D31]/60 border-[#DFB771]/20 text-[#F6FEFC] placeholder-[#F6FEFC]/30 focus:border-[#DFB771]/60';
  const inputLight = 'bg-white border-[#031D16]/15 text-[#031D16] placeholder-[#031D16]/40 focus:border-[#247459]';
  const inputClass = `flex-1 px-4 py-3 rounded-lg border text-sm focus:outline-none transition-colors ${variant === 'light' ? inputLight : inputDark}`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md mx-auto">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@26.8.1/build/css/intlTelInput.css" />
      <style>{`
        .iti-waitlist { width: 100%; }
        .iti-waitlist .iti__selected-dial-code { color: ${variant === 'light' ? '#031D16' : '#F6FEFC'}; font-size: 14px; }
        .iti-waitlist .iti__arrow { border-top-color: ${variant === 'light' ? '#031D16' : '#F6FEFC'}; }
        .iti-waitlist .iti__flag-container { padding-left: 8px; }
        .iti-waitlist .iti__selected-country-primary { background: transparent !important; }
        .iti-waitlist .iti__country-list { background: #0E3D31; border-color: #247459; }
        .iti-waitlist .iti__country { color: #F6FEFC; }
        .iti-waitlist .iti__country:hover, .iti-waitlist .iti__country--highlight { background: #247459; }
        .iti-waitlist .iti__dial-code { color: #DFB771; }
        .iti-waitlist .iti__search-input { background: #0E3D31; color: #F6FEFC; border-color: #247459; }
      `}</style>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          ref={phoneRef}
          type="tel"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`${inputClass}`}
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
