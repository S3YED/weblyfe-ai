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
  const [noAccount, setNoAccount] = useState(false);
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
        const data = (await res.json().catch(() => ({}))) as { noAccount?: boolean };
        if (data.noAccount) {
          setNoAccount(true);
        } else {
          setSent(true);
        }
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
    <main className="hud relative min-h-screen text-[#cce9dd]">
      <CosmicBackdrop intensity="medium" />
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center px-5 py-16 sm:px-8">
        <AnimatePresence mode="wait">
          {noAccount ? (
            <motion.div
              key="no-account"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="w-full text-center"
              data-testid="login-no-account"
            >
              <p className="hud-mono text-[11px] uppercase tracking-[0.22em] text-[#fdd38a]">[404] GEEN ACCOUNT</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#cce9dd] sm:text-4xl">Nog geen account?</h1>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#a2d0bf]/70">
                We vonden geen account voor <span className="hud-mono text-[#cce9dd]">{email}</span>. Bestel je
                Instant Appie op weblyfe.ai, dan staat je dashboard direct klaar.
              </p>
              <a
                href="https://weblyfe.ai"
                className="group mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-sm bg-[#dfb771] px-7 text-[15px] font-bold tracking-tight text-[#422d00] shadow-[0_0_28px_-8px_rgba(253,211,138,0.7)] transition hover:bg-[#fdd38a]"
                data-testid="login-goto-weblyfe"
              >
                Ga naar weblyfe.ai
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <button
                type="button"
                onClick={() => {
                  setNoAccount(false);
                  setEmail('');
                  setTouched(false);
                }}
                className="mt-8 hud-mono flex w-full items-center justify-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#a2d0bf]/40 transition hover:text-[#cce9dd]/70"
              >
                <RotateCw size={12} />
                Ander e-mailadres
              </button>
            </motion.div>
          ) : sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="w-full text-center"
            >
              <SuccessIllustration />
              <p className="mt-8 hud-mono text-[11px] uppercase tracking-[0.22em] text-[#fdd38a]">[NET] CHECK JE INBOX</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#cce9dd] sm:text-4xl">Link onderweg</h1>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#a2d0bf]/70">
                Als <span className="hud-mono text-[#cce9dd]">{email}</span> bij ons bekend is, hebben we een setup-link gestuurd. De link werkt 15 minuten en kan één keer gebruikt worden.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setEmail('');
                  setTouched(false);
                }}
                className="mt-8 hud-mono inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#a2d0bf]/40 transition hover:text-[#cce9dd]/70"
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
                <p className="hud-mono text-[11px] uppercase tracking-[0.22em] text-[#fdd38a]">INSTANT_APPIE</p>
                <h1 className="mt-2 text-3xl font-bold leading-[1.1] tracking-tight text-[#cce9dd] sm:text-4xl">
                  Stuur me een nieuwe link
                </h1>
                <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#a2d0bf]/70">
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
                  className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-sm bg-[#dfb771] px-7 text-[15px] font-bold tracking-tight text-[#422d00] shadow-[0_0_28px_-8px_rgba(253,211,138,0.7)] transition hover:bg-[#fdd38a] disabled:opacity-60"
                  data-testid="login-submit"
                >
                  {submitting ? 'Bezig.' : 'Stuur link'}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                </button>

                {error ? (
                  <p className="hud-mono rounded-sm border border-[#ffb4ab]/40 border-l-2 border-l-[#ffb4ab] bg-[#ffb4ab]/[0.08] p-3 text-sm text-[#ffb4ab]">
                    [ERR] {error}
                  </p>
                ) : null}

                <p className="hud-mono flex items-center justify-center gap-2 pt-4 text-[11px] uppercase tracking-[0.18em] text-[#a2d0bf]/35">
                  <ShieldCheck size={12} className="text-[#fdd38a]" />
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
        className="absolute inset-0 rounded-full bg-[#fdd38a]/15 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="hud-frame hud-frame-active relative flex h-full w-full items-center justify-center rounded-sm border border-[#dfb771]/30 bg-gradient-to-br from-[#dfb771]/15 to-transparent backdrop-blur-xl"
      >
        <Mail className="h-14 w-14 text-[#fdd38a]" strokeWidth={1.3} />
      </motion.div>
    </div>
  );
}
