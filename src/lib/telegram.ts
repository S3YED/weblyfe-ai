// Telegram first-ping sender.
// In dev/preview: log to dev_pings table OR console (graceful degradation).
// In staging/prod: use existing @appieweblyfeopusbot if TELEGRAM_OPS_BOT_TOKEN env is set.

import type { PoolClient } from 'pg';
import { logInfo } from './log';

export type FirstPingArgs = {
  appieId: string;
  customerName: string;
  icp: string;
  language: 'nl' | 'en';
};

function renderFirstPing(args: FirstPingArgs): string {
  if (args.language === 'en') {
    return `Hi ${args.customerName}, your Appie is online. I focus on: ${args.icp}. Reply with anything you want me to take off your plate today.`;
  }
  return `Hoi ${args.customerName}, je Appie staat aan. Ik focus op: ${args.icp}. Stuur me waar ik vandaag aan moet werken.`;
}

export async function sendFirstPing(
  client: PoolClient,
  args: FirstPingArgs
): Promise<void> {
  const body = renderFirstPing(args);

  const opsToken = process.env.TELEGRAM_OPS_BOT_TOKEN;
  if (opsToken && process.env.TELEGRAM_OPS_CHAT_ID) {
    try {
      await fetch(`https://api.telegram.org/bot${opsToken}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_OPS_CHAT_ID,
          text: `[Instant Appie] First ping for appie=${args.appieId}: ${body}`,
        }),
      });
    } catch (err) {
      logInfo('telegram.first-ping.ops-bot-failed', { error: String(err) });
    }
  }

  // Always record in dev_pings so it's inspectable from the dashboard / tests.
  await client.query(
    `INSERT INTO dev_pings (appie_id, body) VALUES ($1, $2)`,
    [args.appieId, body]
  );
  logInfo('telegram.first-ping.recorded', { appieId: args.appieId });
}
