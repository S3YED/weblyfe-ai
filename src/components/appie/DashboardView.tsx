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
  { ts: '09:31', icon: 'lead', title: 'Lead gekwalificeerd', detail: 'Mark de Vries — past op je doelklant, intake gepland.' },
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
  const className = 'h-4 w-4 text-[#DFB771]';
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
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xl">
      <span className="relative flex h-2 w-2">
        {online ? (
          <motion.span
            className="absolute inset-0 rounded-full bg-[#DFB771]"
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : null}
        <span className={`relative h-2 w-2 rounded-full ${online ? 'bg-[#DFB771]' : 'bg-amber-400/80'}`} />
      </span>
      <span data-testid="appie-status-label">{online ? 'Online · Aan het werk' : 'Wordt klaargezet'}</span>
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
      className={`rounded-3xl border border-white/[0.07] bg-white/[0.03] p-6 backdrop-blur-xl ${
        full ? 'sm:col-span-2' : ''
      }`}
    >
      <p className="text-[10px] uppercase tracking-[0.22em] text-[#DFB771]">{kicker}</p>
      <h3 className="mt-1 text-lg font-bold tracking-tight text-white">{title}</h3>
      <div className="mt-5">{children}</div>
    </motion.section>
  );
}

export default function DashboardView({ data }: { data: DashboardViewData }) {
  const isOnline = data.appieStatus === 'online';
  const greeting = data.name ? `Welkom terug, ${data.name}` : 'Welkom terug';

  return (
    <main className="relative min-h-screen text-white">
      <CosmicBackdrop />
      <div className="mx-auto w-full max-w-5xl px-5 pb-32 pt-[max(2rem,env(safe-area-inset-top))] sm:px-8 sm:py-14">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#DFB771]">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{greeting}</h1>
            {data.email ? (
              <p className="mt-1 text-sm text-white/45">{data.email}</p>
            ) : null}
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusPill online={isOnline} />
            <span
              data-testid="appie-status-dot"
              aria-hidden
              className={`h-1 w-1 rounded-full ${isOnline ? 'bg-[#DFB771]' : 'bg-amber-400'}`}
            />
            <p className="text-[11px] text-white/40">{isOnline ? 'Net klaar met inbox-triage' : `${data.appiePercent ?? 0}% klaar`}</p>
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
                <p className="text-sm text-white/55">Je bot:</p>
                <Link
                  href={`https://t.me/${data.telegramBotUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-base font-semibold text-[#DFB771] underline-offset-4 hover:underline"
                >
                  @{data.telegramBotUsername}
                  <ArrowUpRight size={14} />
                </Link>
                <p className="text-xs text-white/40">Laatst actief: net</p>
              </div>
            ) : (
              <p className="text-sm text-white/55">Bot wordt geleased zodra Appie online is.</p>
            )}
          </Card>

          <Card kicker="Bespaard" title="Tijd terug in je dag">
            <div className="flex items-baseline gap-2">
              <CountUp to={4.6} decimals={1} duration={1.6} className="text-5xl font-bold tracking-tight text-white tabular-nums" />
              <span className="text-sm text-white/55">uur deze week</span>
            </div>
            <p className="mt-3 text-xs text-white/40">
              Geschat op basis van afgehandelde inbox + plannen + opvolgen.
            </p>
          </Card>

          <Card kicker="Komende acties" title="Wat Appie zo gaat doen">
            <ul className="space-y-3">
              {NEXT_ACTIONS.map((a) => (
                <li key={a.label} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[#DFB771]">
                    <Clock size={12} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-white">{a.label}</p>
                    <p className="text-xs text-white/45">{a.time}</p>
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
                  className="flex items-start gap-4 border-t border-white/[0.06] pt-4 first:border-t-0 first:pt-0"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-[#DFB771]/30 bg-[#DFB771]/10">
                    <ActivityIcon kind={row.icon} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate text-sm font-semibold text-white">{row.title}</p>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-white/40 tabular-nums">{row.ts}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-white/55">{row.detail}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </Card>

          <Card kicker="Abonnement" title="Beta-prijs" full>
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-4xl font-bold tracking-tight text-white">€250</span>
              <span className="text-sm text-white/55">/ maand</span>
              {data.betaLocked ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DFB771]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#DFB771]">
                  <CheckCircle2 size={12} />
                  Vergrendeld
                </span>
              ) : null}
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-white/45">
              <CircleDot size={12} className="text-[#DFB771]" />
              <span>
                Status: <span className="text-white capitalize">{data.subscriptionStatus ?? 'onbekend'}</span>
                {data.subscriptionTier ? <span className="text-white/35"> · {data.subscriptionTier}</span> : null}
              </span>
            </p>
          </Card>
        </div>

        {data.telegramBotUsername ? (
          <Link
            href={`https://t.me/${data.telegramBotUsername}`}
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-30 inline-flex items-center gap-2 rounded-full bg-[#DFB771] px-5 py-3 text-sm font-bold tracking-tight text-[#031D16] shadow-[0_18px_50px_-15px_rgba(223,183,113,0.7)] transition hover:bg-[#e8c889]"
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
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3">
      <Icon size={14} className="text-[#DFB771]" />
      <p className="mt-2 text-3xl font-bold leading-none text-white tabular-nums">
        <CountUp to={value} duration={1.2} />
      </p>
      <p className="mt-1.5 text-[11px] leading-tight text-white/45">{label}</p>
    </div>
  );
}
