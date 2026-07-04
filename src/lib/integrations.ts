// Bring-your-own-token integrations: Notion + Airtable.
// The customer pastes THEIR OWN integration token / PAT; we validate it
// server-side against the provider API and surface the connected workspace /
// base name back. Mirrors the bring-your-own Telegram bot pattern.
//
// SECURITY: the raw token is a secret. It is never logged, never echoed in an
// error message, and never returned to the client. Only public, non-secret
// identity (workspace name, base names) is surfaced.

export type FetchLike = typeof fetch;

// Machine-readable error codes so the UI can branch + localise. Never contains
// the token.
export type IntegrationErrorCode =
  | 'malformed'
  | 'invalid-token'
  | 'no-access'
  | 'network';

export type ValidateOk = {
  ok: true;
  // Human-friendly label of what we connected to (workspace / base name).
  label: string;
  // Optional richer detail, e.g. list of base names for Airtable.
  detail?: string;
};

export type ValidateErr = {
  ok: false;
  error: IntegrationErrorCode;
};

export type IntegrationValidateResult = ValidateOk | ValidateErr;

// ── Notion ──────────────────────────────────────────────────────────────────
// Notion internal integration tokens are long opaque strings. Historically they
// start with `secret_`; newer ones start with `ntn_`. We accept either shape
// (plus a generous length floor) so we never reject a valid future format, and
// rely on the live GET /v1/users/me call as the real source of truth.
const NOTION_VERSION = '2022-06-28';

export function isWellFormedNotionToken(token: string): boolean {
  const t = token.trim();
  if (t.length < 20) return false;
  return /^(secret_|ntn_)?[A-Za-z0-9_-]{16,}$/.test(t);
}

// Validate a Notion integration token by calling GET /v1/users/me. On success we
// resolve the bot's owning workspace name (when the token is a bot/integration
// token, Notion returns the workspace_name on the bot owner).
export async function validateNotionToken(
  token: string,
  fetchImpl: FetchLike = fetch
): Promise<IntegrationValidateResult> {
  const clean = token.trim();
  if (!isWellFormedNotionToken(clean)) {
    return { ok: false, error: 'malformed' };
  }

  let res: Response;
  try {
    res = await fetchImpl('https://api.notion.com/v1/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${clean}`,
        'Notion-Version': NOTION_VERSION,
      },
    });
  } catch {
    return { ok: false, error: 'network' };
  }

  if (res.status === 401 || res.status === 403) {
    return { ok: false, error: 'invalid-token' };
  }
  if (!res.ok) {
    return { ok: false, error: 'invalid-token' };
  }

  let body: {
    object?: string;
    name?: string;
    bot?: { workspace_name?: string };
  };
  try {
    body = (await res.json()) as typeof body;
  } catch {
    return { ok: false, error: 'network' };
  }

  if (body.object !== 'user') {
    return { ok: false, error: 'invalid-token' };
  }

  // Prefer the workspace name (integration token); fall back to the bot/user
  // display name; finally a generic label so we never show an empty string.
  const label =
    body.bot?.workspace_name?.trim() || body.name?.trim() || 'Notion workspace';
  return { ok: true, label };
}

// ── Airtable ─────────────────────────────────────────────────────────────────
// Airtable Personal Access Tokens start with `pat`. We accept that shape (plus a
// length floor) and verify via the metadata API.
export function isWellFormedAirtablePat(token: string): boolean {
  const t = token.trim();
  return /^pat[A-Za-z0-9._-]{10,}$/.test(t);
}

// Validate an Airtable PAT. We call GET /v0/meta/whoami to confirm the token,
// then GET /v0/meta/bases to surface the base names the token can reach (which
// is the part the customer actually cares about: "is my base connected?").
export async function validateAirtablePat(
  token: string,
  fetchImpl: FetchLike = fetch
): Promise<IntegrationValidateResult> {
  const clean = token.trim();
  if (!isWellFormedAirtablePat(clean)) {
    return { ok: false, error: 'malformed' };
  }

  let who: Response;
  try {
    who = await fetchImpl('https://api.airtable.com/v0/meta/whoami', {
      method: 'GET',
      headers: { Authorization: `Bearer ${clean}` },
    });
  } catch {
    return { ok: false, error: 'network' };
  }

  if (who.status === 401 || who.status === 403) {
    return { ok: false, error: 'invalid-token' };
  }
  if (!who.ok) {
    return { ok: false, error: 'invalid-token' };
  }

  // whoami succeeded -> the token is valid. Now best-effort enumerate bases for
  // a friendlier label. A token can be valid but scoped without
  // schema.bases:read, in which case /meta/bases 403s; that is NOT a failure of
  // the connection, so we degrade gracefully to a generic label.
  let label = 'Airtable account';
  let detail: string | undefined;
  try {
    const basesRes = await fetchImpl('https://api.airtable.com/v0/meta/bases', {
      method: 'GET',
      headers: { Authorization: `Bearer ${clean}` },
    });
    if (basesRes.ok) {
      const body = (await basesRes.json()) as {
        bases?: { id?: string; name?: string }[];
      };
      const names = (body.bases ?? [])
        .map((b) => b.name?.trim())
        .filter((n): n is string => Boolean(n));
      if (names.length === 1) {
        label = names[0];
      } else if (names.length > 1) {
        label = `${names.length} bases`;
        detail = names.slice(0, 5).join(', ') + (names.length > 5 ? ', …' : '');
      }
    }
  } catch {
    // network blip enumerating bases - the token is already validated, keep the
    // generic label rather than failing the whole connect.
  }

  return { ok: true, label, detail };
}

export type IntegrationProvider = 'notion' | 'airtable';

export async function validateIntegrationToken(
  provider: IntegrationProvider,
  token: string,
  fetchImpl: FetchLike = fetch
): Promise<IntegrationValidateResult> {
  switch (provider) {
    case 'notion':
      return validateNotionToken(token, fetchImpl);
    case 'airtable':
      return validateAirtablePat(token, fetchImpl);
    default:
      return { ok: false, error: 'malformed' };
  }
}
