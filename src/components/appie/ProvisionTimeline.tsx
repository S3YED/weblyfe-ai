'use client';

// Vertical 6-step timeline for the Appie provisioning page.
// Done = gold filled icon + timestamp. Active = pulsing icon + "...". Pending = outline.
// A thin gold trail connects the dots; the segment up to the active step animates in.

import { motion } from 'framer-motion';
import {
  Server,
  Network,
  Terminal,
  MessageCircle,
  Brain,
  Sparkles,
  Check,
  type LucideIcon,
} from 'lucide-react';

export type TimelineStep = {
  id: string;
  label: string;
  detail: string;
};

const ICON_BY_ID: Record<string, LucideIcon> = {
  'server-creating': Server,
  'network-attaching': Network,
  'cloud-init-running': Terminal,
  'telegram-bot-leasing': MessageCircle,
  'agent-starting': Brain,
  'first-ping': Sparkles,
};

const DEFAULT_DETAILS: Record<string, string> = {
  'server-creating': 'Server reserveren (Hetzner CX32 EU)',
  'network-attaching': 'Netwerk + firewall instellen',
  'cloud-init-running': 'Cloud-init draaien (Hermes Agent)',
  'telegram-bot-leasing': 'Telegram bot leasen',
  'agent-starting': 'Persoonlijke Techwiz instellen',
  'first-ping': 'Eerste briefing voorbereiden',
};

type Props = {
  steps: TimelineStep[];
  activeIdx: number;
  online: boolean;
  completedAt: Map<string, string>;
};

export default function ProvisionTimeline({ steps, activeIdx, online, completedAt }: Props) {
  return (
    <ol className="relative space-y-3" data-testid="provision-timeline">
      {steps.map((s, i) => {
        const Icon = ICON_BY_ID[s.id] ?? Server;
        const done = online || activeIdx > i;
        const active = !online && activeIdx === i;
        const detail = s.detail || DEFAULT_DETAILS[s.id] || s.label;
        const ts = completedAt.get(s.id);
        return (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.4 }}
            className="relative flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-4 backdrop-blur-xl"
          >
            <div className="relative">
              {active ? (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-2xl bg-[#DFB771]/30 blur-md"
                  animate={{ opacity: [0.25, 0.7, 0.25] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              ) : null}
              <span
                className={`relative flex h-10 w-10 items-center justify-center rounded-2xl border ${
                  done
                    ? 'border-[#DFB771]/60 bg-[#DFB771] text-[#031D16]'
                    : active
                    ? 'border-[#DFB771]/60 bg-[#DFB771]/15 text-[#DFB771]'
                    : 'border-white/10 bg-white/[0.03] text-white/40'
                }`}
              >
                {done ? <Check size={16} strokeWidth={3} /> : <Icon size={16} strokeWidth={1.6} />}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-semibold ${done ? 'text-white' : active ? 'text-white' : 'text-white/55'}`}>
                {s.label}
              </p>
              <p className="mt-0.5 text-xs text-white/45">{detail}</p>
            </div>
            <div className="shrink-0 text-right">
              {done && ts ? (
                <span className="text-[11px] uppercase tracking-[0.16em] text-white/45 tabular-nums">{ts}</span>
              ) : active ? (
                <motion.span
                  className="inline-flex items-end gap-0.5"
                  initial={false}
                >
                  {[0, 0.2, 0.4].map((d) => (
                    <motion.span
                      key={d}
                      className="block h-1 w-1 rounded-full bg-[#DFB771]"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: d, ease: 'easeInOut' }}
                    />
                  ))}
                </motion.span>
              ) : (
                <span className="text-[11px] text-white/25">.</span>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
