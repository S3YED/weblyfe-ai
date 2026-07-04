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

// HUD tactical-log channel tag per step, matching onboarding_final_deployment
// log lines: [SYS] infra, [NET] networking, [AGT] agent runtime.
const CHANNEL_BY_ID: Record<string, string> = {
  'server-creating': '[SYS]',
  'network-attaching': '[NET]',
  'cloud-init-running': '[SYS]',
  'telegram-bot-leasing': '[NET]',
  'agent-starting': '[AGT]',
  'first-ping': '[AGT]',
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
        const channel = CHANNEL_BY_ID[s.id] ?? '[SYS]';
        return (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.4 }}
            className={`hud-frame ${active ? 'hud-frame-active' : ''} hud-panel relative flex items-start gap-4 overflow-hidden px-4 py-4`}
          >
            {active ? (
              <span aria-hidden className="hud-scanline pointer-events-none absolute inset-x-0 top-0 h-12" />
            ) : null}
            <div className="relative">
              {active ? (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-sm bg-[#fdd38a]/30 blur-md"
                  animate={{ opacity: [0.25, 0.7, 0.25] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              ) : null}
              <span
                className={`relative flex h-10 w-10 items-center justify-center rounded-sm border ${
                  done
                    ? 'border-[#dfb771]/60 bg-[#dfb771] text-[#422d00]'
                    : active
                    ? 'border-[#dfb771]/60 bg-[#dfb771]/15 text-[#fdd38a]'
                    : 'border-[#a2d0bf]/12 bg-[#00110c]/60 text-[#a2d0bf]/40'
                }`}
              >
                {done ? <Check size={16} strokeWidth={3} /> : <Icon size={16} strokeWidth={1.6} />}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-semibold ${done || active ? 'text-[#cce9dd]' : 'text-[#a2d0bf]/55'}`}>
                <span className={`hud-mono mr-2 text-xs ${active ? 'text-[#fdd38a]' : 'text-[#a2d0bf]/45'}`}>{channel}</span>
                {s.label}
              </p>
              <p className="mt-0.5 hud-mono text-xs text-[#a2d0bf]/45">{detail}</p>
            </div>
            <div className="shrink-0 text-right">
              {done && ts ? (
                <span className="hud-mono text-[11px] tracking-[0.1em] text-[#a2d0bf]/45 tabular-nums">{ts}</span>
              ) : active ? (
                <motion.span
                  className="inline-flex items-end gap-0.5"
                  initial={false}
                >
                  {[0, 0.2, 0.4].map((d) => (
                    <motion.span
                      key={d}
                      className="block h-1 w-1 rounded-full bg-[#fdd38a]"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: d, ease: 'easeInOut' }}
                    />
                  ))}
                </motion.span>
              ) : (
                <span className="hud-mono text-[11px] text-[#a2d0bf]/25">--:--</span>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
