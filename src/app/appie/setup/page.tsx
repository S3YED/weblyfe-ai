'use client';

// Instant Appie BETA: 5-step onboarding wizard.
// Steps: name -> ICP -> voice -> Telegram handle -> primary tool (Google Calendar).
// Mobile-first. Brand: #031D16 + #DFB771. Rethink Sans loaded globally.
// All copy in Dutch (Seyed's audience).

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  User as UserIcon,
  Target,
  Mic,
  Send,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import CosmicBackdrop from '@/components/appie/CosmicBackdrop';
import StepIndicator from '@/components/appie/StepIndicator';
import StepHero from '@/components/appie/StepHero';
import FloatingInput from '@/components/appie/FloatingInput';
import SavedIndicator from '@/components/appie/SavedIndicator';
import Waveform from '@/components/appie/Waveform';
import CalendarPreview from '@/components/appie/CalendarPreview';

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

const TELEGRAM_RE = /^@?[a-z0-9_]{3,}$/i;

export default function SetupWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<number, boolean>>({});

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

  const validation = useMemo(() => {
    switch (step) {
      case 1:
        return {
          ok: state.name.trim().length >= 2,
          message: 'Minimaal 2 letters.',
        };
      case 2:
        return {
          ok: state.icp.trim().length >= 10,
          message: 'Geef minimaal één korte zin (10+ tekens).',
        };
      case 3:
        return {
          ok: Boolean(state.voiceLanguage) && Boolean(state.voiceTone),
          message: 'Kies taal en toon.',
        };
      case 4:
        return {
          ok: TELEGRAM_RE.test(state.telegramHandle.trim()),
          message: 'Format: @jouwhandle (3+ tekens, letters, cijfers, _).',
        };
      case 5:
        return {
          ok: state.primaryTool === 'google_calendar',
          message: 'Selecteer een tool.',
        };
      default:
        return { ok: false, message: '' };
    }
  }, [step, state]);

  const showError = touched[step] && !validation.ok;

  function next() {
    setTouched((t) => ({ ...t, [step]: true }));
    if (!validation.ok) return;
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }

  async function finish() {
    setTouched((t) => ({ ...t, [step]: true }));
    if (!validation.ok) return;
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
        // Stash the chat-bind deep-link so the provisioning page can show the
        // customer a tap-to-bind link (P0 follow-up).
        if (data.telegramDeepLink) {
          localStorage.setItem('appie:telegramDeepLink', String(data.telegramDeepLink));
        }
      } catch {}
      router.push('/appie/setup/provisioning');
    } catch (e) {
      setError(`Netwerkfout: ${(e as Error).message}`);
      setSubmitting(false);
    }
  }

  return (
    <main className="hud relative min-h-screen text-[#cce9dd]">
      <CosmicBackdrop />
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] sm:px-8 sm:py-14">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="hud-mono text-[11px] uppercase tracking-[0.22em] text-[#fdd38a]">INSTANT_APPIE</p>
            <p className="mt-1 hud-mono text-[13px] tracking-[0.08em] text-[#a2d0bf]/70">
              SEQ: {String(step).padStart(2, '0')}/{String(TOTAL_STEPS).padStart(2, '0')}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="-mr-1 max-w-full overflow-x-auto">
              <StepIndicator total={TOTAL_STEPS} current={step} />
            </div>
            <SavedIndicator trigger={state} />
          </div>
        </header>

        <section className="grid flex-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`hero-${step}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {step === 1 && (
                  <StepHero
                    icon={UserIcon}
                    kicker="SEQ 01 · IDENTITEIT"
                    caption="Appie spreekt jou en je klanten persoonlijk aan. Begin met je naam."
                  />
                )}
                {step === 2 && (
                  <StepHero
                    icon={Target}
                    kicker="SEQ 02 · DOELKLANT"
                    caption="Hoe scherper je doelklant, hoe beter Appie triëert wat belangrijk is."
                  />
                )}
                {step === 3 && (
                  <StepHero
                    icon={Mic}
                    kicker="SEQ 03 · STEM"
                    caption="Toon en taal waarmee Appie schrijft, mailt en praat."
                  />
                )}
                {step === 4 && (
                  <StepHero
                    icon={Send}
                    kicker="SEQ 04 · TELEGRAM"
                    caption="Appie pingt jou hier zodra hij online is. Geen apps, geen logins."
                  />
                )}
                {step === 5 && (
                  <StepHero
                    icon={CalendarIcon}
                    kicker="SEQ 05 · EERSTE TOOL"
                    caption="Beta levert één tool. De rest komt er stapsgewijs bij."
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`form-${step}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 1 && <Step1Name state={state} setState={setState} error={showError ? validation.message : undefined} />}
              {step === 2 && <Step2Icp state={state} setState={setState} error={showError ? validation.message : undefined} />}
              {step === 3 && <Step3Voice state={state} setState={setState} />}
              {step === 4 && <Step4Telegram state={state} setState={setState} error={showError ? validation.message : undefined} />}
              {step === 5 && <Step5Tool state={state} setState={setState} />}
            </motion.div>
          </AnimatePresence>
        </section>

        {error ? (
          <p className="mt-4 hud-mono rounded-sm border border-[#ffb4ab]/40 border-l-2 border-l-[#ffb4ab] bg-[#ffb4ab]/[0.08] p-3 text-sm text-[#ffb4ab]">
            [ERR] {error}
          </p>
        ) : null}

        <footer className="mt-10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1 || submitting}
            className="hud-mono inline-flex h-12 items-center gap-2 rounded-sm px-5 text-xs uppercase tracking-[0.12em] text-[#a2d0bf]/60 transition hover:bg-[#a2d0bf]/[0.06] hover:text-[#cce9dd] disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft size={16} /> Terug
          </button>
          {step < TOTAL_STEPS ? (
            <motion.button
              type="button"
              onClick={next}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="group inline-flex h-14 items-center gap-3 rounded-sm bg-[#dfb771] px-7 text-[15px] font-bold tracking-tight text-[#422d00] shadow-[0_0_24px_-6px_rgba(253,211,138,0.6)] transition hover:bg-[#fdd38a] disabled:opacity-50"
            >
              Volgende
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={finish}
              disabled={submitting}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex h-14 items-center gap-3 rounded-sm bg-[#dfb771] px-7 text-[15px] font-bold tracking-tight text-[#422d00] shadow-[0_0_24px_-6px_rgba(253,211,138,0.6)] transition hover:bg-[#fdd38a] disabled:opacity-50"
              data-testid="finish-wizard"
            >
              {submitting ? 'Bezig.' : 'Activeer Appie'}
              <Check size={18} />
            </motion.button>
          )}
        </footer>
      </div>
    </main>
  );
}

function Step1Name({ state, setState, error }: { state: WizardState; setState: (s: WizardState) => void; error?: string }) {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-[#cce9dd] sm:text-4xl">Hoe heet je?</h1>
        <p className="text-[15px] leading-relaxed text-[#a2d0bf]/75">
          Zo spreekt Appie je in Telegram aan en zo introduceert hij zich tegen je klanten.
        </p>
      </header>
      <FloatingInput
        label="Voornaam"
        value={state.name}
        onChange={(v) => setState({ ...state, name: v })}
        placeholder="Bijv. Seyed"
        autoFocus
        testId="wizard-name"
        error={error}
      />
    </div>
  );
}

function Step2Icp({ state, setState, error }: { state: WizardState; setState: (s: WizardState) => void; error?: string }) {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-[#cce9dd] sm:text-4xl">Wie is je doelklant?</h1>
        <p className="text-[15px] leading-relaxed text-[#a2d0bf]/75">
          Een tot twee zinnen. Hoe scherper, hoe beter Appie weet wat hij voor je triëert.
        </p>
      </header>
      <FloatingInput
        multiline
        rows={4}
        label="Beschrijf je ideale klant"
        hint="Bijv. MKB-bouwbedrijven in Zuid-Holland, 5-50 medewerkers, projecten boven 25k."
        value={state.icp}
        onChange={(v) => setState({ ...state, icp: v })}
        autoFocus
        testId="wizard-icp"
        error={error}
      />
    </div>
  );
}

function Step3Voice({ state, setState }: { state: WizardState; setState: (s: WizardState) => void }) {
  const tones: { value: WizardState['voiceTone']; label: string; desc: string; seed: number }[] = [
    { value: 'direct', label: 'Direct', desc: 'Kort, helder, geen poespas.', seed: 0 },
    { value: 'warm', label: 'Warm', desc: 'Vriendelijk, persoonlijk, geduldig.', seed: 1.2 },
    { value: 'professioneel', label: 'Zakelijk', desc: 'Formeel, beleefd, neutraal.', seed: 2.4 },
  ];
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-[#cce9dd] sm:text-4xl">Welke stem past bij jou?</h1>
        <p className="text-[15px] leading-relaxed text-[#a2d0bf]/75">
          Taal en toon waarmee Appie je klanten benadert. Je kunt dit later bijschaven.
        </p>
      </header>

      <div className="space-y-3">
        <p className="hud-mono text-[10px] uppercase tracking-[0.2em] text-[#fdd38a]">Taal</p>
        <div className="grid grid-cols-2 gap-3">
          {(['nl', 'en'] as const).map((lang) => {
            const active = state.voiceLanguage === lang;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => setState({ ...state, voiceLanguage: lang })}
                className={`hud-frame group relative h-14 overflow-hidden rounded-sm border px-5 text-left text-sm font-semibold transition backdrop-blur-xl ${
                  active
                    ? 'hud-frame-active border-[#dfb771]/40 bg-[#dfb771]/12 text-[#cce9dd]'
                    : 'border-[#a2d0bf]/12 bg-[#0a241d]/60 text-[#cce9dd]/80 hover:border-[#a2d0bf]/25 hover:bg-[#0a241d]/80'
                }`}
                data-testid={`wizard-lang-${lang}`}
              >
                <span className="flex items-center justify-between">
                  <span>{lang === 'nl' ? 'Nederlands' : 'English'}</span>
                  <span className={`hud-mono text-[11px] uppercase tracking-[0.18em] ${active ? 'text-[#fdd38a]' : 'text-[#a2d0bf]/40'}`}>
                    {lang}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="hud-mono text-[10px] uppercase tracking-[0.2em] text-[#fdd38a]">Toon</p>
        <div className="space-y-3">
          {tones.map((t) => {
            const active = state.voiceTone === t.value;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => setState({ ...state, voiceTone: t.value })}
                className={`hud-frame group flex w-full items-center justify-between gap-4 rounded-sm border p-4 text-left transition backdrop-blur-xl ${
                  active
                    ? 'hud-frame-active border-[#dfb771]/40 bg-[#dfb771]/10'
                    : 'border-[#a2d0bf]/12 bg-[#0a241d]/60 hover:border-[#a2d0bf]/25 hover:bg-[#0a241d]/80'
                }`}
                data-testid={`wizard-tone-${t.value}`}
              >
                <div className="min-w-0">
                  <div className="font-semibold text-[#cce9dd]">{t.label}</div>
                  <div className="text-xs text-[#a2d0bf]/60">{t.desc}</div>
                </div>
                <Waveform active={active} seed={t.seed} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Step4Telegram({
  state,
  setState,
  error,
}: {
  state: WizardState;
  setState: (s: WizardState) => void;
  error?: string;
}) {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-[#cce9dd] sm:text-4xl">Wat is je Telegram-handle?</h1>
        <p className="text-[15px] leading-relaxed text-[#a2d0bf]/75">
          Appie pingt jou hier zodra hij online is. Nog geen Telegram? Download de app, maak een account, en geef je handle.
        </p>
      </header>
      <FloatingInput
        label="Telegram handle"
        hint="Bijv. @seyed_voorbeeld"
        value={state.telegramHandle}
        onChange={(v) => setState({ ...state, telegramHandle: v })}
        placeholder="@jouwhandle"
        autoFocus
        testId="wizard-telegram"
        error={error}
      />
    </div>
  );
}

function Step5Tool({ state, setState }: { state: WizardState; setState: (s: WizardState) => void }) {
  // Gmail is deferred per PRD (gmail.readonly is RESTRICTED scope, 4-12 weeks security review).
  // Only Google Calendar is available at MVP. Future: Notion, Brevo, Moneybird.
  const tools = [
    { value: 'google_calendar' as const, label: 'Google Calendar', desc: 'Agenda lezen, plannen, voorstellen.', enabled: true },
  ];
  const oauthConfigured =
    typeof window !== 'undefined' &&
    Boolean((window as unknown as { __GOOGLE_OAUTH_READY?: boolean }).__GOOGLE_OAUTH_READY);
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-[#cce9dd] sm:text-4xl">Welke tool koppel je als eerste?</h1>
        <p className="text-[15px] leading-relaxed text-[#a2d0bf]/75">
          Beta levert één tool. De rest, Notion, Brevo en Moneybird, komt na launch.
        </p>
      </header>
      <div className="grid gap-3">
        {tools.map((t) => {
          const active = state.primaryTool === t.value;
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => setState({ ...state, primaryTool: t.value })}
              disabled={!t.enabled}
              className={`hud-frame flex items-center justify-between rounded-sm border p-4 text-left transition backdrop-blur-xl ${
                active
                  ? 'hud-frame-active border-[#dfb771]/40 bg-[#dfb771]/10'
                  : 'border-[#a2d0bf]/12 bg-[#0a241d]/60 hover:border-[#a2d0bf]/25'
              }`}
              data-testid={`wizard-tool-${t.value}`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#00110c]/70 border border-[#a2d0bf]/10">
                  <CalendarIcon size={18} className="text-[#fdd38a]" />
                </span>
                <div>
                  <div className="font-semibold text-[#cce9dd]">{t.label}</div>
                  <div className="text-xs text-[#a2d0bf]/60">{t.desc}</div>
                </div>
              </div>
              {active ? (
                <span className="hud-mono rounded-sm bg-[#dfb771] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#422d00]">
                  ACTIEF
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <CalendarPreview />
      {!oauthConfigured ? (
        <p className="hud-panel p-3 text-xs text-[#a2d0bf]/65">
          De Google Calendar koppeling staat klaar, OAuth productie-review loopt nog. Je kunt nu door, en koppelen vanaf het dashboard zodra Appie online is.
        </p>
      ) : null}
    </div>
  );
}
