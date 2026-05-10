// GET /appie/api/provision/status
// Returns the current provisioning step + percent for the polling page.
// In mock mode advances state based on time-since-started.
// When 'first-ping' is reached, sends the ping and flips status to 'online'.

import { NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/auth/session';
import { withUserScope } from '@/lib/db';
import { computeMockProgress, STEP_LABELS, STEP_ORDER } from '@/lib/hetzner-mock';
import { sendFirstPing } from '@/lib/telegram';
import { logInfo } from '@/lib/log';
import { __testStore__, isE2eMode } from '@/lib/test-store';

export const runtime = 'nodejs';

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const visibleSteps = STEP_ORDER.filter((s) => s !== 'queued' && s !== 'online').map((id) => ({
    id,
    label: STEP_LABELS[id],
  }));

  if (isE2eMode()) {
    const appie = __testStore__.appies.get(userId);
    if (!appie || !appie.provisionStartedAt) {
      return NextResponse.json({ step: 'queued', percent: 0, online: false, steps: visibleSteps });
    }
    if (appie.status === 'online') {
      return NextResponse.json({ step: 'online', percent: 100, online: true, steps: visibleSteps });
    }
    // E2E mode uses an accelerated tick: 1 second per step instead of 5.
    const elapsed = Date.now() - appie.provisionStartedAt.getTime();
    const tickMs = 700;
    const idx = Math.min(STEP_ORDER.length - 1, Math.floor(elapsed / tickMs) + 1);
    const step = STEP_ORDER[idx];
    const percent = Math.min(100, Math.round((idx / (STEP_ORDER.length - 1)) * 100));
    if (step === 'online') {
      appie.status = 'online';
      __testStore__.pings.push({
        appieUserId: userId,
        body: `Hoi ${(appie.onboardingState as { name?: string })?.name ?? 'daar'}, je Appie staat aan.`,
        ts: new Date(),
      });
      return NextResponse.json({ step: 'online', percent: 100, online: true, steps: visibleSteps });
    }
    return NextResponse.json({ step, percent, online: false, steps: visibleSteps });
  }

  try {
    const result = await withUserScope(userId, async (client) => {
      const r = await client.query<{
        id: string;
        status: string | null;
        provision_started_at: Date | null;
        onboarding_state: { name?: string; icp?: string; voiceLanguage?: 'nl' | 'en' } | null;
      }>(
        `SELECT id, status, provision_started_at, onboarding_state
         FROM appies WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
        [userId]
      );
      if (r.rowCount === 0) return null;
      const appie = r.rows[0];

      if (appie.status === 'online') {
        return { step: 'online', percent: 100, online: true, appieId: appie.id };
      }
      if (!appie.provision_started_at) {
        return { step: 'queued', percent: 0, online: false, appieId: appie.id };
      }

      const progress = computeMockProgress(new Date(appie.provision_started_at));
      // Persist progress
      await client.query(
        `UPDATE appies SET provision_step = $2, provision_percent = $3 WHERE id = $1`,
        [appie.id, progress.step, String(progress.percent)]
      );

      // When we hit 'online', flip status + send first ping (idempotent: only once).
      if (progress.step === 'online' && appie.status !== 'online') {
        await client.query(`UPDATE appies SET status = 'online' WHERE id = $1`, [appie.id]);
        const onboarding = appie.onboarding_state || {};
        await sendFirstPing(client, {
          appieId: appie.id,
          customerName: onboarding.name || 'daar',
          icp: onboarding.icp || 'jouw doelklant',
          language: (onboarding.voiceLanguage as 'nl' | 'en') || 'nl',
        });
        logInfo('provision.online', { appieId: appie.id });
        return { step: 'online', percent: 100, online: true, appieId: appie.id };
      }

      return {
        step: progress.step,
        percent: progress.percent,
        online: false,
        appieId: appie.id,
      };
    });

    if (!result) {
      return NextResponse.json(
        { step: 'queued', percent: 0, online: false, steps: visibleSteps },
        { status: 200 }
      );
    }

    return NextResponse.json({
      step: result.step,
      percent: result.percent,
      online: result.online,
      steps: visibleSteps,
    });
  } catch {
    // Graceful degradation: DB unavailable. Return queued state.
    return NextResponse.json(
      { step: 'queued', percent: 0, online: false, steps: visibleSteps },
      { status: 200 }
    );
  }
}
