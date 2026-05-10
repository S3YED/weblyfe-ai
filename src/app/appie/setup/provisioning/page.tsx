'use client';

// Provisioning timeline page. Polls /appie/api/provision/status every 3s until 'online'.
// Six visible steps mirror lib/hetzner-mock.ts STEP_ORDER (skipping the 'queued' bookend).

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ProvisionState = {
  step: string;
  percent: number;
  online: boolean;
  steps: { id: string; label: string }[];
};

const FALLBACK_STEPS = [
  { id: 'server-creating', label: 'Server wordt aangemaakt' },
  { id: 'network-attaching', label: 'Netwerk en firewall configureren' },
  { id: 'cloud-init-running', label: 'Cloud-init draait' },
  { id: 'telegram-bot-leasing', label: 'Telegram bot leasen' },
  { id: 'agent-starting', label: 'Hermes agent starten' },
  { id: 'first-ping', label: 'Eerste persoonlijke ping' },
];

export default function ProvisioningPage() {
  const [state, setState] = useState<ProvisionState>({
    step: 'queued',
    percent: 0,
    online: false,
    steps: FALLBACK_STEPS,
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
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
        if (data.online) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTimeout(() => router.push('/appie/dashboard'), 800);
        }
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
  }, [router]);

  const activeIdx = state.steps.findIndex((s) => s.id === state.step);

  return (
    <main className="min-h-screen bg-[#031D16] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 py-12 sm:px-6">
        <header className="mb-8">
          <p className="text-xs uppercase tracking-widest text-[#DFB771]">Activeren</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Je Appie wordt klaargezet</h1>
          <p className="mt-2 text-sm text-white/60">
            Dit duurt ongeveer 30 seconden. Je krijgt zo een eerste bericht in Telegram.
          </p>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-[#DFB771]"
              animate={{ width: `${state.percent}%` }}
              transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            />
          </div>
          <p className="mt-2 text-xs text-white/50">{state.percent}%</p>
        </header>

        <ol className="space-y-3" data-testid="provision-timeline">
          {state.steps.map((s, i) => {
            const done = activeIdx > i || state.online;
            const active = activeIdx === i && !state.online;
            return (
              <li
                key={s.id}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition ${
                  done
                    ? 'border-[#DFB771]/40 bg-[#DFB771]/10'
                    : active
                    ? 'border-white/30 bg-white/10'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    done ? 'bg-[#DFB771] text-[#031D16]' : active ? 'bg-white/20 text-white' : 'bg-white/10 text-white/50'
                  }`}
                >
                  {done ? <Check size={14} /> : active ? <Loader2 size={14} className="animate-spin" /> : i + 1}
                </span>
                <span className={`text-sm ${done ? 'text-white' : active ? 'text-white' : 'text-white/60'}`}>{s.label}</span>
              </li>
            );
          })}
        </ol>

        {error ? (
          <p className="mt-6 rounded-md border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>
        ) : null}

        {state.online ? (
          <p className="mt-6 text-center text-sm text-[#DFB771]">Klaar. Je gaat door naar het dashboard.</p>
        ) : null}
      </div>
    </main>
  );
}
