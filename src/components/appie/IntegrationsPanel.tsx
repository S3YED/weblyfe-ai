'use client';

// Bring-your-own-token integrations surface (Aetheris HUD theme).
// The headline connection surface on the dashboard: the customer pastes THEIR
// own Notion integration token / Airtable PAT, we validate it server-side
// (GET /v1/users/me for Notion, /v0/meta/whoami for Airtable), show the
// resolved workspace / base label, then on confirm store it encrypted via the
// connect route. Mirrors the bring-your-own Telegram bot panel.
//
// DEAD SIMPLE on purpose: one card per provider, paste -> test -> connect.
// NL + EN copy (driven by `lang`). Mobile-first.

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  CircleDot,
  ExternalLink,
  Loader2,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { NotionGlyph, AirtableGlyph } from './IntegrationGlyphs';

type Lang = 'nl' | 'en';
type Provider = 'notion' | 'airtable';

export type IntegrationState = {
  connected: boolean;
  label: string | null;
};

type Status =
  | { kind: 'idle' }
  | { kind: 'validating' }
  | { kind: 'validated'; label: string; detail?: string }
  | { kind: 'connecting' }
  | { kind: 'connected'; label: string; detail?: string }
  | { kind: 'error'; message: string };

type ProviderCopy = {
  name: string;
  tagline: string;
  howTitle: string;
  steps: string[];
  helpUrl: string;
  helpLabel: string;
  label: string;
  placeholder: string;
};

const COPY = {
  nl: {
    kicker: 'KOPPELINGEN',
    title: 'Verbind je tools',
    lede:
      'Geef je Appie toegang tot je eigen werkruimte. Plak je token, wij testen hem direct. Niets verlaat onze servers onversleuteld.',
    test: 'Test token',
    testing: 'Bezig met testen.',
    connectedPrefix: 'Verbonden met',
    confirm: 'Koppel',
    connecting: 'Koppelen.',
    disconnect: 'Loskoppelen',
    disconnecting: 'Loskoppelen.',
    notConnected: 'Niet verbonden',
    connected: 'Verbonden',
    secure: 'Token versleuteld opgeslagen',
    comingSoon: 'Binnenkort',
    googleNote: 'Google Agenda en Gmail komen eraan, zodra de verificatie rond is.',
    errMalformed: 'Dit lijkt geen geldige token. Controleer of je hem volledig hebt geplakt.',
    errInvalid: 'Deze token wordt niet geaccepteerd. Controleer hem bij de provider.',
    errNoAccess: 'De token werkt, maar heeft geen toegang. Deel je werkruimte met de integratie.',
    errNetwork: 'Kon de provider niet bereiken. Probeer het zo opnieuw.',
    errGeneric: 'Er ging iets mis. Probeer het opnieuw.',
  },
  en: {
    kicker: 'CONNECTIONS',
    title: 'Connect your tools',
    lede:
      'Give your Appie access to your own workspace. Paste your token, we test it instantly. Nothing leaves our servers unencrypted.',
    test: 'Test token',
    testing: 'Testing.',
    connectedPrefix: 'Connected to',
    confirm: 'Connect',
    connecting: 'Connecting.',
    disconnect: 'Disconnect',
    disconnecting: 'Disconnecting.',
    notConnected: 'Not connected',
    connected: 'Connected',
    secure: 'Token stored encrypted',
    comingSoon: 'Coming soon',
    googleNote: 'Google Calendar and Gmail are on the way, once verification clears.',
    errMalformed: "This doesn't look like a valid token. Make sure you pasted all of it.",
    errInvalid: "This token isn't accepted. Double-check it with the provider.",
    errNoAccess: "The token works but has no access. Share your workspace with the integration.",
    errNetwork: "Couldn't reach the provider. Try again in a moment.",
    errGeneric: 'Something went wrong. Please try again.',
  },
} as const;

const PROVIDER_COPY: Record<Lang, Record<Provider, ProviderCopy>> = {
  nl: {
    notion: {
      name: 'Notion',
      tagline: 'Je Appie leest en schrijft in jouw Notion-werkruimte.',
      howTitle: 'Zo maak je een token (1 minuut)',
      steps: [
        'Ga naar notion.so/my-integrations en klik New integration.',
        'Geef hem een naam (bijv. Appie) en kopieer de Internal Integration Token.',
        'Open de pagina die je wilt delen, klik ... en Connect to je integratie.',
      ],
      helpUrl: 'https://www.notion.so/my-integrations',
      helpLabel: 'notion.so/my-integrations',
      label: 'Notion integratie-token',
      placeholder: 'secret_... of ntn_...',
    },
    airtable: {
      name: 'Airtable',
      tagline: 'Je Appie werkt met jouw Airtable-bases.',
      howTitle: 'Zo maak je een token (1 minuut)',
      steps: [
        'Ga naar airtable.com/create/tokens en klik Create token.',
        'Geef leesrechten (data.records:read) en kies de bases die je wilt delen.',
        'Kopieer de token (begint met pat) en plak hem hieronder.',
      ],
      helpUrl: 'https://airtable.com/create/tokens',
      helpLabel: 'airtable.com/create/tokens',
      label: 'Airtable Personal Access Token',
      placeholder: 'pat...',
    },
  },
  en: {
    notion: {
      name: 'Notion',
      tagline: 'Your Appie reads and writes in your Notion workspace.',
      howTitle: 'Create a token (1 minute)',
      steps: [
        'Go to notion.so/my-integrations and click New integration.',
        'Give it a name (e.g. Appie) and copy the Internal Integration Token.',
        'Open the page you want to share, click ... and Connect to your integration.',
      ],
      helpUrl: 'https://www.notion.so/my-integrations',
      helpLabel: 'notion.so/my-integrations',
      label: 'Notion integration token',
      placeholder: 'secret_... or ntn_...',
    },
    airtable: {
      name: 'Airtable',
      tagline: 'Your Appie works with your Airtable bases.',
      howTitle: 'Create a token (1 minute)',
      steps: [
        'Go to airtable.com/create/tokens and click Create token.',
        'Grant read access (data.records:read) and pick the bases to share.',
        'Copy the token (starts with pat) and paste it below.',
      ],
      helpUrl: 'https://airtable.com/create/tokens',
      helpLabel: 'airtable.com/create/tokens',
      label: 'Airtable Personal Access Token',
      placeholder: 'pat...',
    },
  },
};

function errorMessage(code: string, c: (typeof COPY)[Lang]): string {
  switch (code) {
    case 'malformed':
    case 'missing-token':
      return c.errMalformed;
    case 'invalid-token':
      return c.errInvalid;
    case 'no-access':
      return c.errNoAccess;
    case 'network':
      return c.errNetwork;
    default:
      return c.errGeneric;
  }
}

function ProviderGlyph({ provider }: { provider: Provider }) {
  return provider === 'notion' ? <NotionGlyph /> : <AirtableGlyph />;
}

function IntegrationCard({
  provider,
  lang,
  initial,
}: {
  provider: Provider;
  lang: Lang;
  initial: IntegrationState;
}) {
  const c = COPY[lang];
  const pc = PROVIDER_COPY[lang][provider];
  const [token, setToken] = useState('');
  const [open, setOpen] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [status, setStatus] = useState<Status>(
    initial.connected
      ? { kind: 'connected', label: initial.label ?? pc.name }
      : { kind: 'idle' }
  );

  const busy =
    status.kind === 'validating' ||
    status.kind === 'connecting' ||
    disconnecting;
  const isConnected = status.kind === 'connected';

  async function test() {
    if (!token.trim() || busy) return;
    setStatus({ kind: 'validating' });
    try {
      const res = await fetch(`/api/appie/integrations/${provider}/validate`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token: token.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStatus({ kind: 'error', message: errorMessage(data.error, c) });
        return;
      }
      setStatus({ kind: 'validated', label: data.label, detail: data.detail });
    } catch {
      setStatus({ kind: 'error', message: c.errNetwork });
    }
  }

  async function confirm() {
    if (!token.trim() || busy) return;
    setStatus({ kind: 'connecting' });
    try {
      const res = await fetch(`/api/appie/integrations/${provider}/connect`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token: token.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStatus({ kind: 'error', message: errorMessage(data.error, c) });
        return;
      }
      setStatus({ kind: 'connected', label: data.label, detail: data.detail });
      setToken('');
      setOpen(false);
    } catch {
      setStatus({ kind: 'error', message: c.errNetwork });
    }
  }

  async function disconnect() {
    if (busy) return;
    setDisconnecting(true);
    try {
      const res = await fetch(`/api/appie/integrations/${provider}/disconnect`, {
        method: 'POST',
      });
      if (!res.ok) {
        setStatus({ kind: 'error', message: c.errGeneric });
        return;
      }
      setStatus({ kind: 'idle' });
      setOpen(false);
    } catch {
      setStatus({ kind: 'error', message: c.errNetwork });
    } finally {
      setDisconnecting(false);
    }
  }

  return (
    <div
      className="hud-frame hud-panel relative p-5"
      data-testid={`integration-card-${provider}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[#a2d0bf]/12 bg-[#00110c]/70">
            <ProviderGlyph provider={provider} />
          </span>
          <div className="min-w-0">
            <h3 className="text-base font-bold tracking-tight text-[#cce9dd]">{pc.name}</h3>
            <p className="mt-0.5 text-xs leading-relaxed text-[#a2d0bf]/65">{pc.tagline}</p>
          </div>
        </div>
        {isConnected ? (
          <span className="hud-mono inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-[#dfb771]/30 bg-[#dfb771]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fdd38a]">
            <Check size={11} />
            {c.connected}
          </span>
        ) : (
          <span className="hud-mono inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-[#a2d0bf]/15 bg-[#0a241d]/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a2d0bf]/70">
            <CircleDot size={11} />
            {c.notConnected}
          </span>
        )}
      </div>

      {/* Connected summary */}
      {isConnected ? (
        <div className="mt-4">
          <p
            className="hud-mono flex items-center gap-2 text-sm text-[#cce9dd]"
            data-testid={`integration-label-${provider}`}
          >
            <ShieldCheck size={15} className="text-[#fdd38a]" />
            {c.connectedPrefix} <span className="text-[#fdd38a]">{status.label}</span>
          </p>
          {status.detail ? (
            <p className="mt-1.5 pl-[23px] text-xs text-[#a2d0bf]/55">{status.detail}</p>
          ) : null}
          <p className="mt-2 pl-[23px] hud-mono text-[10px] uppercase tracking-[0.14em] text-[#a2d0bf]/35">
            {c.secure}
          </p>
          <button
            type="button"
            onClick={disconnect}
            disabled={busy}
            data-testid={`integration-disconnect-${provider}`}
            className="mt-4 inline-flex items-center gap-2 rounded-sm border border-[#a2d0bf]/15 bg-[#00110c]/50 px-3 py-2 text-xs font-semibold text-[#a2d0bf]/70 transition hover:border-[#ffb4ab]/40 hover:text-[#ffb4ab] disabled:opacity-50"
          >
            {disconnecting ? (
              <>
                <Loader2 size={13} className="animate-spin" /> {c.disconnecting}
              </>
            ) : (
              <>
                <Trash2 size={13} /> {c.disconnect}
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="mt-4">
          {!open ? (
            <button
              type="button"
              onClick={() => setOpen(true)}
              data-testid={`integration-open-${provider}`}
              className="inline-flex h-11 items-center gap-2 rounded-sm bg-[#dfb771] px-5 text-sm font-bold tracking-tight text-[#422d00] transition hover:bg-[#fdd38a]"
            >
              {c.confirm} {pc.name}
            </button>
          ) : (
            <div>
              {/* Inline help */}
              <div className="rounded-sm border border-[#a2d0bf]/12 bg-[#00110c]/50 p-4">
                <p className="hud-mono text-[10px] uppercase tracking-[0.2em] text-[#fdd38a]">
                  {pc.howTitle}
                </p>
                <ol className="mt-3 space-y-2">
                  {pc.steps.map((s, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-xs leading-relaxed text-[#a2d0bf]/70"
                    >
                      <span className="hud-mono mt-px shrink-0 text-[#fdd38a]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                <a
                  href={pc.helpUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 hud-mono text-xs text-[#fdd38a] underline-offset-4 hover:underline"
                >
                  {pc.helpLabel}
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Token input */}
              <div className="mt-4">
                <label
                  htmlFor={`int-token-${provider}`}
                  className="hud-mono block text-[10px] uppercase tracking-[0.2em] text-[#fdd38a]"
                >
                  {pc.label}
                </label>
                <input
                  id={`int-token-${provider}`}
                  type="password"
                  autoComplete="off"
                  spellCheck={false}
                  value={token}
                  onChange={(e) => {
                    setToken(e.target.value);
                    if (status.kind === 'error' || status.kind === 'validated') {
                      setStatus({ kind: 'idle' });
                    }
                  }}
                  placeholder={pc.placeholder}
                  data-testid={`integration-input-${provider}`}
                  className="mt-2 h-13 w-full rounded-sm border border-b-2 border-[#a2d0bf]/12 border-b-[#dfb771]/40 bg-[#00110c]/80 px-4 py-3 font-mono text-base text-[#cce9dd] outline-none backdrop-blur-xl transition placeholder:text-[#a2d0bf]/30 focus:border-[#dfb771] focus:hud-glow-box"
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
                    data-testid={`integration-validated-${provider}`}
                  >
                    <ShieldCheck size={15} className="text-[#fdd38a]" />
                    {c.connectedPrefix}{' '}
                    <span className="text-[#fdd38a]">{status.label}</span>
                  </motion.p>
                ) : status.kind === 'error' ? (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 hud-mono rounded-sm border border-[#ffb4ab]/40 border-l-2 border-l-[#ffb4ab] bg-[#ffb4ab]/[0.08] p-3 text-sm text-[#ffb4ab]"
                    data-testid={`integration-error-${provider}`}
                  >
                    [ERR] {status.message}
                  </motion.p>
                ) : null}
              </AnimatePresence>

              {/* Actions */}
              <div className="mt-4 flex flex-wrap gap-3">
                {status.kind === 'validated' ? (
                  <button
                    type="button"
                    onClick={confirm}
                    disabled={busy}
                    data-testid={`integration-confirm-${provider}`}
                    className="inline-flex h-11 items-center gap-2 rounded-sm bg-[#dfb771] px-5 text-sm font-bold tracking-tight text-[#422d00] transition hover:bg-[#fdd38a] disabled:opacity-50"
                  >
                    {status.kind === 'validated' && busy ? (
                      <>
                        <Loader2 size={15} className="animate-spin" /> {c.connecting}
                      </>
                    ) : (
                      <>
                        <Check size={15} /> {c.confirm}
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={test}
                    disabled={!token.trim() || busy}
                    data-testid={`integration-test-${provider}`}
                    className="inline-flex h-11 items-center gap-2 rounded-sm bg-[#dfb771] px-5 text-sm font-bold tracking-tight text-[#422d00] transition hover:bg-[#fdd38a] disabled:opacity-50"
                  >
                    {status.kind === 'validating' ? (
                      <>
                        <Loader2 size={15} className="animate-spin" /> {c.testing}
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={15} /> {c.test}
                      </>
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setToken('');
                    setStatus({ kind: 'idle' });
                  }}
                  disabled={busy}
                  className="hud-mono inline-flex h-11 items-center px-3 text-xs uppercase tracking-[0.14em] text-[#a2d0bf]/40 transition hover:text-[#cce9dd]/70 disabled:opacity-50"
                >
                  Annuleer
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <span aria-hidden className="hud-frame-b" />
    </div>
  );
}

export default function IntegrationsPanel({
  lang = 'nl',
  notion,
  airtable,
}: {
  lang?: Lang;
  notion: IntegrationState;
  airtable: IntegrationState;
}) {
  const c = COPY[lang];
  return (
    <section data-testid="integrations-panel">
      <div className="mb-5">
        <p className="hud-mono text-[10px] uppercase tracking-[0.22em] text-[#fdd38a]">
          {c.kicker}
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#cce9dd]">{c.title}</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#a2d0bf]/65">{c.lede}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <IntegrationCard provider="notion" lang={lang} initial={notion} />
        <IntegrationCard provider="airtable" lang={lang} initial={airtable} />
      </div>

      {/* Google: coming soon (CASA verification gate). */}
      <div
        className="hud-frame hud-panel relative mt-4 flex items-center justify-between gap-3 p-4 opacity-70"
        data-testid="integration-card-google"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-[#a2d0bf]/12 bg-[#00110c]/70 text-[#a2d0bf]/50">
            <CircleDot size={16} />
          </span>
          <p className="text-sm text-[#a2d0bf]/65">{c.googleNote}</p>
        </div>
        <span className="hud-mono shrink-0 rounded-sm border border-[#a2d0bf]/15 bg-[#0a241d]/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a2d0bf]/55">
          {c.comingSoon}
        </span>
        <span aria-hidden className="hud-frame-b" />
      </div>
    </section>
  );
}
