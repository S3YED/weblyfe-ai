// Provider-agnostic provisioning interface for Instant Appie.
// Each customer gets ONE isolated box (Orgo computer or Hetzner server) running
// a Hermes agent. The box is told its identity (appieId + heartbeatSecret) and
// the app URL so it can POST {appie_id, secret} to <APP_URL>/api/appie/heartbeat
// to flip itself online. This honours the P0 seam exactly.
//
// The orchestrator (./index.ts) tries Orgo first and falls back to Hetzner when
// a Provisioner throws a ProvisionerError (paid-plan errors included).

// Inputs the orchestrator passes to every provisioner. Immutable by contract.
export type ProvisionInput = {
  // Stable appie row id. The box echoes this to /api/appie/heartbeat.
  readonly appieId: string;
  // Per-appie shared secret (generated in the provision route, stored on the row).
  // The box presents it back to prove identity on heartbeat.
  readonly heartbeatSecret: string;
  // Public base URL of THIS app (e.g. https://dash.weblyfe.ai). The box posts
  // its heartbeat to `${appUrl}/api/appie/heartbeat`.
  readonly appUrl: string;
  // The customer's own Telegram bot token (decrypted, leased from the pool).
  // Injected into the box so the agent can talk to the customer directly.
  readonly botToken: string;
  // The customer's onboarding answers -> rendered into the box SOUL/config.
  readonly onboardingState: Readonly<Record<string, unknown>>;
  // Optional pre-rendered SOUL markdown. When absent the box build derives a
  // minimal SOUL from onboardingState.
  readonly soul?: string;
  // LLM config injected into the box so the on-box agent can call OpenRouter.
  // Primary is a free model; backup is a credit-backed model used on failure.
  // The key is written to a 0600 env file on the box, never logged.
  readonly llm?: {
    readonly openRouterKey: string;
    readonly model: string;
    readonly backupModel?: string;
  };
};

// What a provisioner returns once a box exists and the setup has been kicked off.
export type ProvisionResult = {
  // Opaque provider-side id (Orgo computer id / Hetzner server id).
  readonly providerId: string;
  // Human-meaningful host handle (hostname or workspace name).
  readonly host: string;
  // Public IP when the provider exposes one (Hetzner does; Orgo may not).
  readonly ip?: string;
};

// Coarse progress for the status poller. `ready` true means the box is up and
// the agent setup has completed from the provider's side; the authoritative
// "online" flip still comes from the box's heartbeat callback.
export type ProvisionStatus = {
  readonly ready: boolean;
  readonly percent: number;
};

// The contract every provider implements.
export interface Provisioner {
  // Stable identifier recorded on the appie row (`provider` column).
  readonly name: 'orgo' | 'hetzner';
  create(input: ProvisionInput): Promise<ProvisionResult>;
  getStatus(providerId: string): Promise<ProvisionStatus>;
  destroy(providerId: string): Promise<void>;
}

// Typed error a provisioner throws to signal "I can't do this, try the next
// provider." The orchestrator catches this (and ONLY this) to trigger fallback;
// anything else is an unexpected bug and bubbles up.
export class ProvisionerError extends Error {
  readonly provider: 'orgo' | 'hetzner';
  // Machine-readable cause so we can log + branch (e.g. 'paid-plan-required').
  readonly code: ProvisionerErrorCode;
  // Original error for the logs (never surfaced to the customer).
  readonly cause?: unknown;

  constructor(
    provider: 'orgo' | 'hetzner',
    code: ProvisionerErrorCode,
    message: string,
    cause?: unknown
  ) {
    super(message);
    this.name = 'ProvisionerError';
    this.provider = provider;
    this.code = code;
    this.cause = cause;
  }
}

export type ProvisionerErrorCode =
  // Orgo account is not on a paid plan -> can't create computers. Expected today.
  | 'paid-plan-required'
  // Missing API key / config for this provider.
  | 'not-configured'
  // The provider's API rejected create / returned a non-2xx.
  | 'create-failed'
  // The box came up but setup (Hermes install / config) failed.
  | 'setup-failed'
  // Network / transport error talking to the provider.
  | 'transport'
  // Anything else the provider classifies as fallback-worthy.
  | 'unknown';
