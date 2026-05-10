'use client';

// Magic-link request UI. POSTs to /appie/auth/request-link.
// Always renders the success state on a 200 response (route always 200s
// to prevent account enumeration), so we treat any 200 as "we sent it if
// the email exists".

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, RotateCw, ShieldCheck } from 'lucide-react';
import CosmicBackdrop from './CosmicBackdrop';
import FloatingInput from './FloatingInput';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const valid = EMAIL_RE.test(email.trim());

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/appie/auth/request-link', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError(`Onbekende fout (${res.status})`);
      }
    } catch (err) {
      setError(`Netwerkfout: ${(err as Error).message}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen text-white">
      <CosmicBackdrop intensity="medium" />
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center px-5 py-16 sm:px-8">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="w-full text-center"
            >
              <SuccessIllustration />
              <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-[#DFB771]">Check je inbox</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Link onderweg</h1>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
                Als <span className="text-white">{email}</span> bij ons bekend is, hebben we een setup-link gestuurd. De link werkt 15 minuten en kan één keer gebruikt worden.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setEmail('');
                  setTouched(false);
                }}
                className="mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-white/40 transition hover:text-white/70"
              >
                <RotateCw size={12} />
                Verkeerd adres? Probeer opnieuw
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <header className="mb-10 text-center">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#DFB771]">Instant Appie</p>
                <h1 className="mt-2 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
                  Stuur me een nieuwe link
                </h1>
                <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
                  Wachtwoordloos. Vul je e-mailadres in, wij sturen een veilige eenmalige link.
                </p>
              </header>

              <form onSubmit={submit} className="space-y-5" noValidate>
                <FloatingInput
                  label="E-mailadres"
                  value={email}
                  onChange={setEmail}
                  type="email"
                  inputMode="email"
                  placeholder="naam@bedrijf.nl"
                  autoFocus
                  testId="login-email"
                  error={touched && !valid ? 'Vul een geldig e-mailadres in.' : undefined}
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#DFB771] px-7 text-[15px] font-bold tracking-tight text-[#031D16] shadow-[0_18px_50px_-15px_rgba(223,183,113,0.7)] transition hover:bg-[#e8c889] disabled:opacity-60"
                  data-testid="login-submit"
                >
                  {submitting ? 'Bezig.' : 'Stuur link'}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                </button>

                {error ? (
                  <p className="rounded-2xl border border-[#FF9C92]/30 bg-[#FF9C92]/10 p-3 text-sm text-[#FFD2CC]">
                    {error}
                  </p>
                ) : null}

                <p className="flex items-center justify-center gap-2 pt-4 text-[11px] uppercase tracking-[0.18em] text-white/35">
                  <ShieldCheck size={12} className="text-[#DFB771]" />
                  Geen wachtwoord, geen gedoe
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function SuccessIllustration() {
  return (
    <div className="relative mx-auto h-32 w-32">
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#DFB771]/15 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex h-full w-full items-center justify-center rounded-3xl border border-[#DFB771]/30 bg-gradient-to-br from-[#DFB771]/15 to-transparent backdrop-blur-xl"
      >
        <Mail className="h-14 w-14 text-[#DFB771]" strokeWidth={1.4} />
      </motion.div>
    </div>
  );
}
