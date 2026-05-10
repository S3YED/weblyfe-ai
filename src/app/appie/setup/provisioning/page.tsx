'use client';

// Provisioning timeline. Polls /appie/api/provision/status every 3s until 'online'.
// Six visible steps mirror lib/hetzner-mock.ts STEP_ORDER (skipping 'queued').
//
// ?demo=1 runs an offline 30s loop so Seyed can preview the cinematic without
// touching the API. Demo mode never redirects.

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import CosmicBackdrop from '@/components/appie/CosmicBackdrop';
import ProgressRing from '@/components/appie/ProgressRing';
import ProvisionTimeline, { type TimelineStep } from '@/components/appie/ProvisionTimeline';
import StepDetailsAccordion from '@/components/appie/StepDetailsAccordion';
import GoldConfetti from '@/components/appie/GoldConfetti';

type ProvisionState = {
  step: string;
  percent: number;
  online: boolean;
  steps: { id: string; label: string }[];
};

const FALLBACK_STEPS: { id: string; label: string; detail: string }[] = [
  { id: 'server-creating', label: 'Server reserveren', detail: 'Hetzner CX32 EU' },
  { id: 'network-attaching', label: 'Netwerk + firewall', detail: 'Tailscale mesh + dichte firewall' },
  { id: 'cloud-init-running', label: 'Cloud-init draaien', detail: 'Hermes Agent installeren' },
  { id: 'telegram-bot-leasing', label: 'Telegram bot leasen', detail: 'Eigen bot uit pool' },
  { id: 'agent-starting', label: 'Persoonlijke Techwiz instellen', detail: 'Naam, stem, doelklant' },
  { id: 'first-ping', label: 'Eerste briefing voorbereiden', detail: 'Eerste persoonlijke ping' },
];

const TOTAL_DEMO_MS = 28000;

function fmtTimestamp(d: Date): string {
  return d.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function ProvisioningPage() {
  const router = useRouter();
  const params = useSearchParams();
  const isDemo = params?.get('demo') === '1';

  const [state, setState] = useState<ProvisionState>({
    step: 'queued',
    percent: 0,
    online: false,
    steps: FALLBACK_STEPS,
  });
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Map<string, string>>(new Map());
  const [confettiFired, setConfettiFired] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const demoStartRef = useRef<number | null>(null);
  const lastStepRef = useRef<string>('queued');

  // Mark a step complete (capture timestamp) when active step advances past it.
  useEffect(() => {
    if (state.step === lastStepRef.current) return;
    setCompleted((prev) => {
      if (prev.has(lastStepRef.current)) return prev;
      const next = new Map(prev);
      // Find previous step to mark complete
      const stepIds = state.steps.map((s) => s.id);
      const lastIdx = stepIds.indexOf(lastStepRef.current);
      if (lastIdx >= 0) next.set(lastStepRef.current, fmtTimestamp(new Date()));
      return next;
    });
    lastStepRef.current = state.step;
  }, [state.step, state.steps]);

  // When online: stamp every step + fire confetti + redirect (unless demo).
  useEffect(() => {
    if (!state.online) return;
    setCompleted((prev) => {
      const next = new Map(prev);
      const now = fmtTimestamp(new Date());
      state.steps.forEach((s) => {
        if (!next.has(s.id)) next.set(s.id, now);
      });
      return next;
    });
    setConfettiFired(true);
    if (isDemo) return;
    const t = setTimeout(() => router.push('/appie/dashboard'), 1500);
    return () => clearTimeout(t);
  }, [state.online, state.steps, isDemo, router]);

  // Demo mode: synthesize a 28s loop locally.
  useEffect(() => {
    if (!isDemo) return;
    function tick() {
      if (demoStartRef.current === null) demoStartRef.current = Date.now();
      const elapsed = Date.now() - demoStartRef.current;
      const cycle = elapsed % (TOTAL_DEMO_MS + 4000);
      if (cycle > TOTAL_DEMO_MS) {
        // brief "online" hold then reset for next loop
        setState((prev) => ({ ...prev, step: 'online', percent: 100, online: true }));
        return;
      }
      const ratio = cycle / TOTAL_DEMO_MS;
      const idx = Math.min(FALLBACK_STEPS.length - 1, Math.floor(ratio * FALLBACK_STEPS.length));
      const stepId = FALLBACK_STEPS[idx].id;
      setState({
        step: stepId,
        percent: Math.round(ratio * 100),
        online: false,
        steps: FALLBACK_STEPS,
      });
      // restart loop after the online pause
      if (cycle > TOTAL_DEMO_MS - 100 && cycle < TOTAL_DEMO_MS + 50) {
        setCompleted(new Map());
        setConfettiFired(false);
      }
      if (cycle > TOTAL_DEMO_MS + 3500) {
        demoStartRef.current = Date.now();
        setCompleted(new Map());
        setConfettiFired(false);
      }
    }
    tick();
    const id = setInterval(tick, 350);
    return () => clearInterval(id);
  }, [isDemo]);

  // Real polling (skipped in demo mode).
  useEffect(() => {
    if (isDemo) return;
    let cancelled = false;
    async function poll() {
      try {
        const res = await fetch('/appie/api/provision/status', { cache: 'no-store' });
        if (!res.ok) {
          setError(`Status ${res.status}`);
          return;
        }
        const data = (await res.json()) as ProvisionState;
        if (cancelled) return;
        setState((prev) => ({ ...prev, ...data }));
        if (data.online && timerRef.current) clearInterval(timerRef.current);
      } catch (e) {
        if (!cancelled) setError(`Netwerkfout: ${(e as Error).message}`);
      }
    }
    poll();
    timerRef.current = setInterval(poll, 3000);
    return () => {
      cancelled = true;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isDemo]);

  const activeIdx = state.steps.findIndex((s) => s.id === state.step);
  const safeActiveIdx = activeIdx < 0 ? 0 : activeIdx;
  const currentLabel = state.online
    ? 'Appie staat aan'
    : state.steps[safeActiveIdx]?.label ?? 'In de wachtrij';

  const etaSeconds = useMemo(() => {
    if (state.online) return null;
    const remainingPct = Math.max(0, 100 - state.percent);
    return Math.max(2, Math.round((remainingPct / 100) * 30));
  }, [state.percent, state.online]);

  const timelineSteps: TimelineStep[] = state.steps.map((s) => {
    const fb = FALLBACK_STEPS.find((f) => f.id === s.id);
    return { id: s.id, label: s.label, detail: fb?.detail ?? '' };
  });

  return (
    <main className="relative min-h-screen text-white">
      <CosmicBackdrop intensity="high" />
      <GoldConfetti fire={confettiFired} />
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] sm:px-8 sm:py-14">
        <header className="mb-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#DFB771]">Activeren</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Je Appie wordt klaargezet</h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/55">
            Dit duurt ongeveer 30 seconden. Je krijgt zo een eerste bericht in Telegram.
          </p>
        </header>

        <div className="mb-12 flex justify-center">
          <ProgressRing
            percent={state.percent}
            stepLabel={currentLabel}
            etaSeconds={etaSeconds}
            online={state.online}
          />
        </div>

        <ProvisionTimeline
          steps={timelineSteps}
          activeIdx={safeActiveIdx}
          online={state.online}
          completedAt={completed}
        />

        {error ? (
          <p className="mt-6 rounded-2xl border border-[#FF9C92]/30 bg-[#FF9C92]/10 p-3 text-sm text-[#FFD2CC]">
            {error}
          </p>
        ) : null}

        <AnimatePresence>
          {state.online ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-8 text-center text-sm font-semibold text-[#DFB771]"
            >
              {isDemo ? 'Demo loop. We resetten zo en starten opnieuw.' : 'Klaar. Je gaat door naar het dashboard.'}
            </motion.p>
          ) : null}
        </AnimatePresence>

        <div className="mt-12">
          <StepDetailsAccordion />
        </div>
      </div>
    </main>
  );
}
