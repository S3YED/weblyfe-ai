// Customer dashboard: Appie status (online/offline), Telegram link, billing summary.
// Server component reads session cookie, queries DB scoped via RLS.

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUserId } from '@/lib/auth/session';
import { withUserScope } from '@/lib/db';
import { __testStore__, isE2eMode } from '@/lib/test-store';

export const dynamic = 'force-dynamic';

type DashboardData = {
  email: string | null;
  appieStatus: string | null;
  appiePercent: number | null;
  telegramBotUsername: string | null;
  subscriptionStatus: string | null;
  subscriptionTier: string | null;
  betaLocked: boolean;
};

async function loadDashboard(userId: string): Promise<DashboardData> {
  return withUserScope(userId, async (client) => {
    const userRes = await client.query<{ email: string }>(
      `SELECT email FROM users WHERE id = $1`,
      [userId]
    );
    const appieRes = await client.query<{
      status: string | null;
      provision_percent: string | null;
      telegram_bot_username: string | null;
    }>(
      `SELECT status, provision_percent, telegram_bot_username
       FROM appies WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );
    const subRes = await client.query<{
      status: string;
      tier: string;
      beta_locked_pricing: boolean;
    }>(
      `SELECT status, tier, beta_locked_pricing
       FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );

    return {
      email: userRes.rows[0]?.email ?? null,
      appieStatus: appieRes.rows[0]?.status ?? null,
      appiePercent: appieRes.rows[0]?.provision_percent
        ? parseInt(appieRes.rows[0].provision_percent, 10)
        : null,
      telegramBotUsername: appieRes.rows[0]?.telegram_bot_username ?? null,
      subscriptionStatus: subRes.rows[0]?.status ?? null,
      subscriptionTier: subRes.rows[0]?.tier ?? null,
      betaLocked: subRes.rows[0]?.beta_locked_pricing ?? false,
    };
  });
}

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect('/appie/setup');

  let data: DashboardData;
  if (isE2eMode()) {
    const appie = __testStore__.appies.get(userId);
    data = {
      email: 'e2e@test.local',
      appieStatus: appie?.status ?? 'pending_setup',
      appiePercent: appie?.status === 'online' ? 100 : null,
      telegramBotUsername: appie?.telegramBotUsername ?? null,
      subscriptionStatus: 'active',
      subscriptionTier: 'instant_appie_beta_250_locked',
      betaLocked: true,
    };
  } else try {
    data = await loadDashboard(userId);
  } catch {
    // Graceful degradation: DB may not be reachable in dev. Show shell.
    data = {
      email: null,
      appieStatus: 'unknown',
      appiePercent: null,
      telegramBotUsername: null,
      subscriptionStatus: null,
      subscriptionTier: null,
      betaLocked: false,
    };
  }

  const isOnline = data.appieStatus === 'online';

  return (
    <main className="min-h-screen bg-[#031D16] text-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-[#DFB771]">Dashboard</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Welkom terug</h1>
          {data.email ? <p className="mt-1 text-sm text-white/60">{data.email}</p> : null}
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Appie status */}
          <Card title="Appie status">
            <div className="flex items-center gap-2">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  isOnline ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
                data-testid="appie-status-dot"
              />
              <span className="font-semibold capitalize" data-testid="appie-status-label">
                {data.appieStatus ?? 'onbekend'}
              </span>
            </div>
            {!isOnline && data.appiePercent !== null ? (
              <p className="mt-2 text-xs text-white/60">{data.appiePercent}% klaar</p>
            ) : null}
          </Card>

          {/* Telegram link */}
          <Card title="Telegram">
            {data.telegramBotUsername ? (
              <Link
                href={`https://t.me/${data.telegramBotUsername}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[#DFB771] underline-offset-4 hover:underline"
              >
                Open @{data.telegramBotUsername}
              </Link>
            ) : (
              <p className="text-sm text-white/60">Bot wordt geleased zodra Appie online is.</p>
            )}
          </Card>

          {/* Billing summary */}
          <Card title="Abonnement" full>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-bold">€250</span>
              <span className="text-sm text-white/60">/ maand</span>
              {data.betaLocked ? (
                <span className="ml-2 rounded-full bg-[#DFB771]/15 px-2 py-0.5 text-xs font-semibold text-[#DFB771]">
                  Beta-prijs vergrendeld
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-xs text-white/60">
              Status: <span className="capitalize">{data.subscriptionStatus ?? 'onbekend'}</span>
              {data.subscriptionTier ? ` · ${data.subscriptionTier}` : ''}
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}

function Card({ title, children, full = false }: { title: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 p-5 ${full ? 'sm:col-span-2' : ''}`}>
      <p className="mb-3 text-xs uppercase tracking-widest text-white/50">{title}</p>
      {children}
    </div>
  );
}
