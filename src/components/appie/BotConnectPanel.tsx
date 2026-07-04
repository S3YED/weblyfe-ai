'use client';

// Bring-your-own Telegram bot connect panel (Aetheris HUD theme).
// The customer pastes THEIR OWN Telegram bot token, we test it server-side via
// /api/appie/bot/validate (getMe), show the resolved @username, then on confirm
// store it encrypted + wire the webhook via /api/appie/bot/connect.
//
// Used both inside the setup wizard and on the dashboard. Mobile-first.
// NL + EN copy (driven by `lang`). Voicenote-first nudge in the success state.

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Check, ExternalLink, Loader2, ShieldCheck } from 'lucide-react';

type Lang = 'nl' | 'en';

type Status =
  | { kind: 'idle' }
  | { kind: 'validating' }
  | { kind: 'validated'; username: string }
  | { kind: 'connecting' }
  | { kind: 'connected'; username: string; deepLink: string | null }
  | { kind: 'error'; message: string };

const COPY = {
  nl: {
    kicker: 'EIGEN BOT',
    title: 'Koppel je Telegram-bot',
    lede:
      'Instant Appie draait op JOUW eigen Telegram-bot. Maak er één aan, plak de token, en wij testen hem direct.',
    howTitle: 'Zo maak je een bot (1 minuut)',
    steps: [
      'Open Telegram en zoek @BotFather.',
      'Stuur /newbot en kies een naam + gebruikersnaam.',
      'BotFather geeft je een token (zoiets als 1234567:ABC...). Plak die hieronder.',
    ],
    label: 'Telegram bot-token',
    placeholder: '1234567:ABCdef...',
    test: 'Test token',
    testing: 'Bezig met testen.',
    validatedPrefix: 'Verbonden met',
    confirm: 'Koppel deze bot',
    connecting: 'Koppelen.',
    connectedTitle: 'Bot gekoppeld',
    connectedBody:
      'Je Appie staat klaar. Open de chat en stuur je Appie gewoon een voicenote, dan pakt hij het op.',
    openChat: 'Open je bot in Telegram',
    errMalformed: 'Dit lijkt geen geldige token. Controleer of je hem volledig hebt geplakt.',
    errInvalid: 'Telegram accepteert deze token niet. Controleer hem bij @BotFather.',
    errNetwork: 'Kon Telegram niet bereiken. Probeer het zo opnieuw.',
    errWebhook: 'Token werkt, maar koppeling mislukte. Probeer het opnieuw.',
    errGeneric: 'Er ging iets mis. Probeer het opnieuw.',
  },
  en: {
    kicker: 'YOUR BOT',
    title: 'Connect your Telegram bot',
    lede:
      'Instant Appie runs on YOUR own Telegram bot. Create one, paste the token, and we test it instantly.',
    howTitle: 'Create a bot (1 minute)',
    steps: [
      'Open Telegram and search for @BotFather.',
      'Send /newbot and pick a name + username.',
      'BotFather gives you a token (like 1234567:ABC...). Paste it below.',
    ],
    label: 'Telegram bot token',
    placeholder: '1234567:ABCdef...',
    test: 'Test token',
    testing: 'Testing.',
    validatedPrefix: 'Connected to',
    confirm: 'Connect this bot',
    connecting: 'Connecting.',
    connectedTitle: 'Bot connected',
    connectedBody:
      'Your Appie is ready. Open the chat and just send your Appie a voicenote, it will take it from there.',
    openChat: 'Open your bot in Telegram',
    errMalformed: "This doesn't look like a valid token. Make sure you pasted all of it.",
    errInvalid: "Telegram won't accept this token. Double-check it with @BotFather.",
    errNetwork: "Couldn't reach Telegram. Try again in a moment.",
    errWebhook: 'Token works, but connecting failed. Please try again.',
    errGeneric: 'Something went wrong. Please try again.',
  },
} as const;

function errorMessage(code: string, c: (typeof COPY)[Lang]): string {
  switch (code) {
    case 'malformed':
    case 'missing-token':
      return c.errMalformed;
    case 'invalid-token':
      return c.errInvalid;
    case 'network':
      return c.errNetwork;
    case 'webhook-failed':
      return c.errWebhook;
    default:
      return c.errGeneric;
  }
}

export default function BotConnectPanel({
  lang = 'nl',
  initialUsername = null,
  onConnected,
}: {
  lang?: Lang;
  initialUsername?: string | null;
  onConnected?: (username: string) => void;
}) {
  const c = COPY[lang];
  const [token, setToken] = useState('');
  const [status, setStatus] = useState<Status>(
    initialUsername
      ? { kind: 'connected', username: initialUsername, deepLink: null }
      : { kind: 'idle' }
  );

  const busy = status.kind === 'validating' || status.kind === 'connecting';

  async function test() {
    if (!token.trim() || busy) return;
    setStatus({ kind: 'validating' });
    try {
      const res = await fetch('/api/appie/bot/validate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token: token.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStatus({ kind: 'error', message: errorMessage(data.error, c) });
        return;
      }
      setStatus({ kind: 'validated', username: data.username });
    } catch {
      setStatus({ kind: 'error', message: c.errNetwork });
    }
  }

  async function confirm() {
    if (!token.trim() || busy) return;
    setStatus({ kind: 'connecting' });
    try {
      const res = await fetch('/api/appie/bot/connect', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token: token.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStatus({ kind: 'error', message: errorMessage(data.error, c) });
        return;
      }
      setStatus({
        kind: 'connected',
        username: data.username,
        deepLink: data.telegramDeepLink ?? null,
      });
      onConnected?.(data.username);
    } catch {
      setStatus({ kind: 'error', message: c.errNetwork });
    }
  }

  if (status.kind === 'connected') {
    const chatHref = status.deepLink ?? `https://t.me/${status.username}`;
    return (
      <div className="hud-frame hud-panel relative p-6" data-testid="bot-connect-panel">
        <p className="hud-mono text-[10px] uppercase tracking-[0.22em] text-[#fdd38a]">
          {c.kicker}
        </p>
        <div className="mt-4 flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#dfb771]/30 bg-[#dfb771]/10 text-[#fdd38a]">
            <Check size={18} />
          </span>
          <div className="min-w-0">
            <h3 className="text-lg font-bold tracking-tight text-[#cce9dd]">
              {c.connectedTitle}
            </h3>
            <p className="mt-1 hud-mono text-sm text-[#fdd38a]">@{status.username}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#a2d0bf]/75">
              {c.connectedBody}
            </p>
            <a
              href={chatHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-sm bg-[#dfb771] px-4 py-2.5 text-sm font-bold tracking-tight text-[#422d00] transition hover:bg-[#fdd38a]"
            >
              {c.openChat}
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
        <span aria-hidden className="hud-frame-b" />
      </div>
    );
  }

  return (
    <div className="hud-frame hud-panel relative p-6" data-testid="bot-connect-panel">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#a2d0bf]/12 bg-[#00110c]/70 text-[#fdd38a]">
          <Bot size={18} />
        </span>
        <div className="min-w-0">
          <p className="hud-mono text-[10px] uppercase tracking-[0.22em] text-[#fdd38a]">
            {c.kicker}
          </p>
          <h3 className="mt-1 text-lg font-bold tracking-tight text-[#cce9dd]">{c.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#a2d0bf]/75">{c.lede}</p>
        </div>
      </div>

      {/* Inline @BotFather help */}
      <div className="mt-5 rounded-sm border border-[#a2d0bf]/12 bg-[#00110c]/50 p-4">
        <p className="hud-mono text-[10px] uppercase tracking-[0.2em] text-[#fdd38a]">
          {c.howTitle}
        </p>
        <ol className="mt-3 space-y-2">
          {c.steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-xs leading-relaxed text-[#a2d0bf]/70">
              <span className="hud-mono mt-px shrink-0 text-[#fdd38a]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <a
          href="https://t.me/BotFather"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 hud-mono text-xs text-[#fdd38a] underline-offset-4 hover:underline"
        >
          @BotFather
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Token input */}
      <div className="mt-5">
        <label
          htmlFor="bot-token"
          className="hud-mono block text-[10px] uppercase tracking-[0.2em] text-[#fdd38a]"
        >
          {c.label}
        </label>
        <input
          id="bot-token"
          type="text"
          autoComplete="off"
          spellCheck={false}
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            if (status.kind === 'error' || status.kind === 'validated') {
              setStatus({ kind: 'idle' });
            }
          }}
          placeholder={c.placeholder}
          data-testid="bot-token-input"
          className="mt-2 h-14 w-full rounded-sm border border-b-2 border-[#a2d0bf]/12 border-b-[#dfb771]/40 bg-[#00110c]/80 px-4 font-mono text-base text-[#cce9dd] outline-none backdrop-blur-xl transition placeholder:text-[#a2d0bf]/30 focus:border-[#dfb771] focus:hud-glow-box"
        />
      </div>

      <AnimatePresence mode="wait">
        {status.kind === 'validated' ? (
          <motion.p
            key="validated"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 inline-flex items-center gap-2 hud-mono text-sm text-[#cce9dd]"
            data-testid="bot-validated"
          >
            <ShieldCheck size={15} className="text-[#fdd38a]" />
            {c.validatedPrefix} <span className="text-[#fdd38a]">@{status.username}</span>
          </motion.p>
        ) : status.kind === 'error' ? (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 hud-mono rounded-sm border border-[#ffb4ab]/40 border-l-2 border-l-[#ffb4ab] bg-[#ffb4ab]/[0.08] p-3 text-sm text-[#ffb4ab]"
            data-testid="bot-error"
          >
            [ERR] {status.message}
          </motion.p>
        ) : null}
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap gap-3">
        {status.kind === 'validated' ? (
          <button
            type="button"
            onClick={confirm}
            disabled={busy}
            data-testid="bot-confirm"
            className="inline-flex h-12 items-center gap-2 rounded-sm bg-[#dfb771] px-6 text-sm font-bold tracking-tight text-[#422d00] transition hover:bg-[#fdd38a] disabled:opacity-50"
          >
            {status.kind === 'validated' && busy ? (
              <>
                <Loader2 size={16} className="animate-spin" /> {c.connecting}
              </>
            ) : (
              <>
                <Check size={16} /> {c.confirm}
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={test}
            disabled={!token.trim() || busy}
            data-testid="bot-test"
            className="inline-flex h-12 items-center gap-2 rounded-sm bg-[#dfb771] px-6 text-sm font-bold tracking-tight text-[#422d00] transition hover:bg-[#fdd38a] disabled:opacity-50"
          >
            {status.kind === 'validating' ? (
              <>
                <Loader2 size={16} className="animate-spin" /> {c.testing}
              </>
            ) : (
              <>
                <ShieldCheck size={16} /> {c.test}
              </>
            )}
          </button>
        )}
      </div>

      <span aria-hidden className="hud-frame-b" />
    </div>
  );
}
