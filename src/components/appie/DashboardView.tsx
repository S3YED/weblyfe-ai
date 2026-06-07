'use client';

// Client component for the customer dashboard.
// Data is loaded server-side (RLS-scoped) and passed down. This file owns
// every animation, every glassmorphism card, and the floating Telegram CTA.

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  CalendarClock,
  Clock,
  Send,
  Mail,
  Sparkles,
  ArrowUpRight,
  Activity,
  CircleDot,
  Inbox,
  Users,
} from 'lucide-react';
import CosmicBackdrop from './CosmicBackdrop';
import CountUp from '@/components/anim/CountUp';

export type DashboardViewData = {
  email: string | null;
  name: string | null;
  appieStatus: string | null;
  appiePercent: number | null;
  telegramBotUsername: string | null;
  subscriptionStatus: string | null;
  subscriptionTier: string | null;
  betaLocked: boolean;
};

type ActivityRow = {
  ts: string;
  icon: 'mail' | 'cal' | 'lead' | 'ping';
  title: string;
  detail: string;
};

const MOCK_ACTIVITY: ActivityRow[] = [
  { ts: '08:42', icon: 'ping', title: 'Goedemorgen ping', detail: 'Briefing voor vandaag verzonden in Telegram.' },
  { ts: '09:14', icon: 'mail', title: 'Inbox getriaged', detail: '12 mails gelezen, 3 markeerd als urgent.' },
  { ts: '09:31', icon: 'lead', title: 'Lead gekwalificeerd', detail: 'Mark de Vries, past op je doelklant, intake gepland.' },
  { ts: '10:05', icon: 'cal', title: 'Afspraak ingepland', detail: 'Vrijdag 14:00, 30 min, met Mark de Vries.' },
  { ts: '11:20', icon: 'mail', title: 'Antwoord verstuurd', detail: 'Naar info@bouwhuys.nl, namens jou, in jouw toon.' },
  { ts: '13:48', icon: 'cal', title: 'Reminder gestuurd', detail: 'Demo morgen 11:00 met Studio Lente.' },
  { ts: '15:02', icon: 'lead', title: 'Lead afgewezen', detail: 'Buiten doelklant, keurige afwijzing verstuurd.' },
  { ts: '16:34', icon: 'mail', title: 'Notitie gemaakt', detail: 'Klant vraagt offerte voor Q3, opgenomen in CRM.' },
];

const NEXT_ACTIONS = [
  { time: 'Over 12 min', label: 'Bevestiging Mark de Vries (e-mail)' },
  { time: 'Vanavond 18:00', label: 'Dagrapport in Telegram' },
  { time: 'Morgen 09:00', label: 'Inbox-triage en briefing' },
];

function ActivityIcon({ kind }: { kind: ActivityRow['icon'] }) {
  const className = 'h-4 w-4 text-[#fdd38a]';
  switch (kind) {
    case 'mail':
      return <Mail className={className} />;
    case 'cal':
      return <CalendarClock className={className} />;
    case 'lead':
      return <Users className={className} />;
    case 'ping':
      return <Sparkles className={className} />;
  }
}

function StatusPill({ online }: { online: boolean }) {
  return (
    <span className="hud-mono inline-flex items-center gap-2 rounded-sm border border-[#a2d0bf]/12 bg-[#0a241d]/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#cce9dd] backdrop-blur-xl">
      <span className="relative flex h-2 w-2">
        {online ? (
          <motion.span
            className="absolute inset-0 rounded-full bg-[#fdd38a]"
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : null}
        <span className={`relative h-2 w-2 rounded-full ${online ? 'bg-[#fdd38a]' : 'bg-[#dfb771]/60'}`} />
      </span>
      <span data-testid="appie-status-label">{online ? 'OPERATIONAL' : 'PROVISIONING'}</span>
    </span>
  );
}

function Card({
  kicker,
  title,
  children,
  full,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`hud-frame hud-panel relative p-6 ${full ? 'sm:col-span-2' : ''}`}
    >
      <p className="hud-mono text-[10px] uppercase tracking-[0.22em] text-[#fdd38a]">{kicker}</p>
      <h3 className="mt-1 text-lg font-bold tracking-tight text-[#cce9dd]">{title}</h3>
      <div className="mt-5">{children}</div>
      <span aria-hidden className="hud-frame-b" />
    </motion.section>
  );
}

export default function DashboardView({ data }: { data: DashboardViewData }) {
  const isOnline = data.appieStatus === 'online';
  const greeting = data.name ? `Welkom terug, ${data.name}` : 'Welkom terug';

  return (
    <main className="hud relative min-h-screen text-[#cce9dd]">
      <CosmicBackdrop />
      <div className="mx-auto w-full max-w-5xl px-5 pb-32 pt-[max(2rem,env(safe-area-inset-top))] sm:px-8 sm:py-14">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="hud-mono text-[11px] uppercase tracking-[0.22em] text-[#fdd38a]">WEBLYFE.AI_CORE</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#cce9dd] sm:text-4xl">{greeting}</h1>
            {data.email ? (
              <p className="mt-1 hud-mono text-sm text-[#a2d0bf]/45">{data.email}</p>
            ) : null}
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusPill online={isOnline} />
            <span
              data-testid="appie-status-dot"
              aria-hidden
              className={`h-1 w-1 rounded-full ${isOnline ? 'bg-[#fdd38a]' : 'bg-[#dfb771]'}`}
            />
            <p className="hud-mono text-[11px] text-[#a2d0bf]/40">{isOnline ? 'Net klaar met inbox-triage' : `${data.appiePercent ?? 0}% klaar`}</p>
          </div>
        </header>

        <div className="grid gap-5 sm:grid-cols-2">
          <Card kicker="Vandaag" title="Wat Appie afhandelde">
            <div className="grid grid-cols-3 gap-3">
              <Stat icon={Inbox} label="Mails geantwoord" value={3} />
              <Stat icon={Users} label="Leads gekwalificeerd" value={1} />
              <Stat icon={CalendarClock} label="Afspraken ingepland" value={2} />
            </div>
          </Card>

          <Card kicker="Telegram" title="Direct contact">
            {data.telegramBotUsername ? (
              <div className="space-y-3">
                <p className="text-sm text-[#a2d0bf]/60">Je bot:</p>
                <Link
                  href={`https://t.me/${data.telegramBotUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hud-mono inline-flex items-center gap-2 text-base font-semibold text-[#fdd38a] underline-offset-4 hover:underline"
                >
                  @{data.telegramBotUsername}
                  <ArrowUpRight size={14} />
                </Link>
                <p className="hud-mono text-xs text-[#a2d0bf]/40">Laatst actief: net</p>
              </div>
            ) : (
              <p className="text-sm text-[#a2d0bf]/60">Bot wordt geleased zodra Appie online is.</p>
            )}
          </Card>

          <Card kicker="Bespaard" title="Tijd terug in je dag">
            <div className="flex items-baseline gap-2">
              <CountUp to={4.6} decimals={1} duration={1.6} className="hud-mono text-5xl font-bold tracking-tight text-[#cce9dd] tabular-nums" />
              <span className="text-sm text-[#a2d0bf]/60">uur deze week</span>
            </div>
            <p className="mt-3 text-xs text-[#a2d0bf]/40">
              Geschat op basis van afgehandelde inbox + plannen + opvolgen.
            </p>
          </Card>

          <Card kicker="Komende acties" title="Wat Appie zo gaat doen">
            <ul className="space-y-3">
              {NEXT_ACTIONS.map((a) => (
                <li key={a.label} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-[#a2d0bf]/15 bg-[#00110c]/60 text-[#fdd38a]">
                    <Clock size={12} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[#cce9dd]">{a.label}</p>
                    <p className="hud-mono text-xs text-[#a2d0bf]/45">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card kicker="Activiteit" title="Laatste 24 uur" full>
            <ol className="relative space-y-4">
              {MOCK_ACTIVITY.map((row, i) => (
                <motion.li
                  key={`${row.ts}-${i}`}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 * i, duration: 0.35 }}
                  className="flex items-start gap-4 border-t border-[#a2d0bf]/[0.08] pt-4 first:border-t-0 first:pt-0"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-[#dfb771]/30 bg-[#dfb771]/10">
                    <ActivityIcon kind={row.icon} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate text-sm font-semibold text-[#cce9dd]">{row.title}</p>
                      <span className="hud-mono text-[11px] tracking-[0.1em] text-[#a2d0bf]/40 tabular-nums">{row.ts}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#a2d0bf]/60">{row.detail}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </Card>

          <Card kicker="Abonnement" title="Beta-prijs" full>
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="hud-mono text-4xl font-bold tracking-tight text-[#cce9dd]">€250</span>
              <span className="text-sm text-[#a2d0bf]/60">/ maand</span>
              {data.betaLocked ? (
                <span className="hud-mono inline-flex items-center gap-1.5 rounded-sm bg-[#dfb771]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#fdd38a]">
                  <CheckCircle2 size={12} />
                  BETA_LOCKED
                </span>
              ) : null}
            </div>
            <p className="mt-3 flex items-center gap-2 hud-mono text-xs text-[#a2d0bf]/45">
              <CircleDot size={12} className="text-[#fdd38a]" />
              <span>
                STATUS: <span className="text-[#cce9dd] capitalize">{data.subscriptionStatus ?? 'onbekend'}</span>
                {data.subscriptionTier ? <span className="text-[#a2d0bf]/35"> · {data.subscriptionTier}</span> : null}
              </span>
            </p>
          </Card>
        </div>

        {data.telegramBotUsername ? (
          <Link
            href={`https://t.me/${data.telegramBotUsername}`}
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-30 inline-flex items-center gap-2 rounded-sm bg-[#dfb771] px-5 py-3 text-sm font-bold tracking-tight text-[#422d00] shadow-[0_0_28px_-8px_rgba(253,211,138,0.7)] transition hover:bg-[#fdd38a]"
          >
            <Send size={15} />
            Open Telegram
          </Link>
        ) : null}
      </div>
    </main>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Activity;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-sm border border-[#a2d0bf]/[0.1] bg-[#00110c]/50 p-3">
      <Icon size={14} className="text-[#fdd38a]" />
      <p className="mt-2 hud-mono text-3xl font-bold leading-none text-[#cce9dd] tabular-nums">
        <CountUp to={value} duration={1.2} />
      </p>
      <p className="mt-1.5 text-[11px] leading-tight text-[#a2d0bf]/45">{label}</p>
    </div>
  );
}
