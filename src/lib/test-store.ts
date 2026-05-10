// In-memory store used in APPIE_E2E mode. Gives the e2e tests a database-free
// path so Playwright can run without Docker. NEVER touched in production.

type MagicTokenRow = {
  userId: string;
  expiresAt: Date;
  usedAt: Date | null;
};

type AppieRow = {
  userId: string;
  status: string;
  provisionStartedAt: Date | null;
  onboardingState: Record<string, unknown>;
  telegramBotUsername: string | null;
  hetznerIp: string | null;
  hetznerServerId: string | null;
};

type Store = {
  magicTokens: Map<string, MagicTokenRow>;
  appies: Map<string, AppieRow>;
  pings: { appieUserId: string; body: string; ts: Date }[];
  webhookEvents: Set<string>;
  reset: () => void;
};

function makeStore(): Store {
  const s: Store = {
    magicTokens: new Map(),
    appies: new Map(),
    pings: [],
    webhookEvents: new Set(),
    reset() {
      s.magicTokens.clear();
      s.appies.clear();
      s.pings.length = 0;
      s.webhookEvents.clear();
    },
  };
  return s;
}

// Singleton across all imports in a single process. The route handlers in
// /appie mode read/write to this when APPIE_E2E=1.
const globalKey = Symbol.for('weblyfe.appie.test-store');
const g = globalThis as unknown as { [k: symbol]: Store | undefined };
if (!g[globalKey]) g[globalKey] = makeStore();

export const __testStore__ = g[globalKey] as Store;

export function isE2eMode(): boolean {
  return process.env.APPIE_E2E === '1';
}
