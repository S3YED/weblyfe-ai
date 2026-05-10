// Customer dashboard: Appie status (online/offline), Telegram link, billing summary.
// Server component reads session cookie, queries DB scoped via RLS, then hands
// off to <DashboardView /> for the cinematic client-side rendering.

import { redirect } from 'next/navigation';
import { getCurrentUserId } from '@/lib/auth/session';
import { withUserScope } from '@/lib/db';
import { __testStore__, isE2eMode } from '@/lib/test-store';
import DashboardView, { type DashboardViewData } from '@/components/appie/DashboardView';

export const dynamic = 'force-dynamic';

async function loadDashboard(userId: string): Promise<DashboardViewData> {
  return withUserScope(userId, async (client) => {
    const userRes = await client.query<{ email: string }>(
      `SELECT email FROM users WHERE id = $1`,
      [userId]
    );
    const appieRes = await client.query<{
      status: string | null;
      provision_percent: string | null;
      telegram_bot_username: string | null;
      onboarding_state: { name?: string } | null;
    }>(
      `SELECT status, provision_percent, telegram_bot_username, onboarding_state
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
      name: appieRes.rows[0]?.onboarding_state?.name ?? null,
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

  let data: DashboardViewData;
  if (isE2eMode()) {
    const appie = __testStore__.appies.get(userId);
    const onboarding = (appie?.onboardingState as { name?: string } | undefined) ?? {};
    data = {
      email: 'e2e@test.local',
      name: onboarding.name ?? null,
      appieStatus: appie?.status ?? 'pending_setup',
      appiePercent: appie?.status === 'online' ? 100 : null,
      telegramBotUsername: appie?.telegramBotUsername ?? null,
      subscriptionStatus: 'active',
      subscriptionTier: 'instant_appie_beta_250_locked',
      betaLocked: true,
    };
  } else {
    try {
      data = await loadDashboard(userId);
    } catch {
      // Graceful degradation: DB may not be reachable in dev. Show shell.
      data = {
        email: null,
        name: null,
        appieStatus: 'unknown',
        appiePercent: null,
        telegramBotUsername: null,
        subscriptionStatus: null,
        subscriptionTier: null,
        betaLocked: false,
      };
    }
  }

  return <DashboardView data={data} />;
}
