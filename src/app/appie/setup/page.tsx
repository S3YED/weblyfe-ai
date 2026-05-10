'use client';

// Instant Appie BETA: 5-step onboarding wizard.
// Steps: name -> ICP -> voice -> Telegram handle -> primary tool (Google Calendar).
// Mobile-first. Brand: #031D16 + #DFB771. Rethink Sans loaded globally.
// All copy in Dutch (Seyed's audience).

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TOTAL_STEPS = 5;

type WizardState = {
  name: string;
  icp: string;
  voiceLanguage: 'nl' | 'en';
  voiceTone: 'direct' | 'warm' | 'professioneel';
  telegramHandle: string;
  primaryTool: 'google_calendar';
};

const INITIAL_STATE: WizardState = {
  name: '',
  icp: '',
  voiceLanguage: 'nl',
  voiceTone: 'direct',
  telegramHandle: '',
  primaryTool: 'google_calendar',
};

export default function SetupWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore in-progress wizard from localStorage so a refresh doesn't lose work.
  useEffect(() => {
    try {
      const cached = localStorage.getItem('appie:wizard:state');
      if (cached) setState({ ...INITIAL_STATE, ...JSON.parse(cached) });
      const cachedStep = localStorage.getItem('appie:wizard:step');
      if (cachedStep) setStep(Math.min(TOTAL_STEPS, Math.max(1, parseInt(cachedStep, 10) || 1)));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('appie:wizard:state', JSON.stringify(state));
      localStorage.setItem('appie:wizard:step', String(step));
    } catch {}
  }, [state, step]);

  const canAdvance = useMemo(() => {
    switch (step) {
      case 1:
        return state.name.trim().length >= 2;
      case 2:
        return state.icp.trim().length >= 10;
      case 3:
        return Boolean(state.voiceLanguage) && Boolean(state.voiceTone);
      case 4:
        return /^@?[a-z0-9_]{3,}$/i.test(state.telegramHandle.trim());
      case 5:
        return state.primaryTool === 'google_calendar';
      default:
        return false;
    }
  }, [step, state]);

  async function finish() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/appie/api/provision', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(state),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || `Onbekende fout (${res.status})`);
        setSubmitting(false);
        return;
      }
      try {
        localStorage.removeItem('appie:wizard:state');
        localStorage.removeItem('appie:wizard:step');
      } catch {}
      router.push('/appie/setup/provisioning');
    } catch (e) {
      setError(`Netwerkfout: ${(e as Error).message}`);
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#031D16] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-8">
          <p className="text-xs uppercase tracking-widest text-[#DFB771]">Instant Appie</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Zet je Appie aan</h1>
          <p className="mt-2 text-sm text-white/60">Stap {step} van {TOTAL_STEPS}</p>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-[#DFB771]"
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>
        </header>

        <section className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {step === 1 && <Step1Name state={state} setState={setState} />}
              {step === 2 && <Step2Icp state={state} setState={setState} />}
              {step === 3 && <Step3Voice state={state} setState={setState} />}
              {step === 4 && <Step4Telegram state={state} setState={setState} />}
              {step === 5 && <Step5Tool state={state} setState={setState} />}
            </motion.div>
          </AnimatePresence>
        </section>

        {error ? (
          <p className="mt-4 rounded-md border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        <footer className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1 || submitting}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft size={16} /> Terug
          </button>
          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
              disabled={!canAdvance}
              className="inline-flex items-center gap-2 rounded-full bg-[#DFB771] px-6 py-3 text-sm font-bold text-[#031D16] transition hover:bg-[#e8c889] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Volgende <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={finish}
              disabled={!canAdvance || submitting}
              className="inline-flex items-center gap-2 rounded-full bg-[#DFB771] px-6 py-3 text-sm font-bold text-[#031D16] transition hover:bg-[#e8c889] disabled:cursor-not-allowed disabled:opacity-40"
              data-testid="finish-wizard"
            >
              {submitting ? 'Bezig.' : 'Activeer Appie'} <Check size={16} />
            </button>
          )}
        </footer>
      </div>
    </main>
  );
}

function FieldShell({ children, label, hint }: { children: React.ReactNode; label: string; hint?: string }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-white">{label}</label>
      {children}
      {hint ? <p className="text-xs text-white/50">{hint}</p> : null}
    </div>
  );
}

function Step1Name({ state, setState }: { state: WizardState; setState: (s: WizardState) => void }) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">Hoe heet je?</h2>
      <p className="mb-6 text-sm text-white/60">Zo spreekt Appie je in Telegram aan.</p>
      <FieldShell label="Voornaam">
        <input
          type="text"
          autoFocus
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
          placeholder="Bijv. Seyed"
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none ring-0 transition focus:border-[#DFB771] focus:bg-white/10"
          data-testid="wizard-name"
        />
      </FieldShell>
    </div>
  );
}

function Step2Icp({ state, setState }: { state: WizardState; setState: (s: WizardState) => void }) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">Wie is je doelklant?</h2>
      <p className="mb-6 text-sm text-white/60">Eén of twee zinnen. Appie gebruikt dit om te triëren wat belangrijk is.</p>
      <FieldShell label="Beschrijf je ideale klant" hint="Bijv. MKB-bouwbedrijven in Zuid-Holland, 5-50 medewerkers, projecten boven 25k.">
        <textarea
          autoFocus
          rows={4}
          value={state.icp}
          onChange={(e) => setState({ ...state, icp: e.target.value })}
          className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none transition focus:border-[#DFB771] focus:bg-white/10"
          data-testid="wizard-icp"
        />
      </FieldShell>
    </div>
  );
}

function Step3Voice({ state, setState }: { state: WizardState; setState: (s: WizardState) => void }) {
  const tones: { value: WizardState['voiceTone']; label: string; desc: string }[] = [
    { value: 'direct', label: 'Direct', desc: 'Kort, helder, geen poespas.' },
    { value: 'warm', label: 'Warm', desc: 'Vriendelijk, persoonlijk, geduldig.' },
    { value: 'professioneel', label: 'Zakelijk', desc: 'Formeel, beleefd, neutraal.' },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-xl font-bold">Welke stem past bij jou?</h2>
        <p className="mb-6 text-sm text-white/60">Taal en toon waarmee Appie je klanten benadert.</p>
      </div>
      <FieldShell label="Taal">
        <div className="grid grid-cols-2 gap-2">
          {(['nl', 'en'] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setState({ ...state, voiceLanguage: lang })}
              className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                state.voiceLanguage === lang
                  ? 'border-[#DFB771] bg-[#DFB771]/15 text-[#DFB771]'
                  : 'border-white/15 bg-white/5 text-white/80 hover:bg-white/10'
              }`}
              data-testid={`wizard-lang-${lang}`}
            >
              {lang === 'nl' ? 'Nederlands' : 'English'}
            </button>
          ))}
        </div>
      </FieldShell>
      <FieldShell label="Toon">
        <div className="grid gap-2">
          {tones.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setState({ ...state, voiceTone: t.value })}
              className={`rounded-lg border px-4 py-3 text-left transition ${
                state.voiceTone === t.value
                  ? 'border-[#DFB771] bg-[#DFB771]/15'
                  : 'border-white/15 bg-white/5 hover:bg-white/10'
              }`}
              data-testid={`wizard-tone-${t.value}`}
            >
              <div className="font-semibold text-white">{t.label}</div>
              <div className="text-xs text-white/60">{t.desc}</div>
            </button>
          ))}
        </div>
      </FieldShell>
    </div>
  );
}

function Step4Telegram({ state, setState }: { state: WizardState; setState: (s: WizardState) => void }) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">Wat is je Telegram-handle?</h2>
      <p className="mb-6 text-sm text-white/60">
        Appie pingt jou hier zodra hij online is. Heb je nog geen Telegram? Download de app, maak een account, en geef je handle.
      </p>
      <FieldShell label="Telegram handle" hint="Bijv. @seyed_voorbeeld">
        <input
          type="text"
          autoFocus
          value={state.telegramHandle}
          onChange={(e) => setState({ ...state, telegramHandle: e.target.value })}
          placeholder="@jouwhandle"
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none transition focus:border-[#DFB771] focus:bg-white/10"
          data-testid="wizard-telegram"
        />
      </FieldShell>
    </div>
  );
}

function Step5Tool({ state, setState }: { state: WizardState; setState: (s: WizardState) => void }) {
  // Gmail is deferred per PRD (gmail.readonly is RESTRICTED scope, 4-12 weeks security review).
  // Only Google Calendar is available at MVP. Future: Notion, Brevo, Moneybird.
  const tools = [
    { value: 'google_calendar' as const, label: 'Google Calendar', desc: 'Agenda lezen, plannen, voorstellen.', enabled: true },
  ];
  const oauthConfigured = typeof window !== 'undefined' && Boolean((window as unknown as { __GOOGLE_OAUTH_READY?: boolean }).__GOOGLE_OAUTH_READY);
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">Welke tool koppel je als eerste?</h2>
      <p className="mb-6 text-sm text-white/60">Beta levert één tool. De rest komt na launch.</p>
      <div className="grid gap-2">
        {tools.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setState({ ...state, primaryTool: t.value })}
            disabled={!t.enabled}
            className={`rounded-lg border px-4 py-3 text-left transition ${
              state.primaryTool === t.value
                ? 'border-[#DFB771] bg-[#DFB771]/15'
                : 'border-white/15 bg-white/5 hover:bg-white/10'
            }`}
            data-testid={`wizard-tool-${t.value}`}
          >
            <div className="font-semibold text-white">{t.label}</div>
            <div className="text-xs text-white/60">{t.desc}</div>
          </button>
        ))}
      </div>
      {!oauthConfigured ? (
        <p className="mt-4 rounded-md border border-white/10 bg-white/5 p-3 text-xs text-white/60">
          Google Calendar koppeling is nog in productie OAuth setup. Je kunt nu door, en koppelen vanaf het dashboard zodra Appie online is.
        </p>
      ) : null}
    </div>
  );
}
