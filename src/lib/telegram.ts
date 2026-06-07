// Telegram first-ping sender.
// Real path: when the customer's chat is bound (telegram_chat_id) and the
//   appie's bot token can be decrypted, send the first ping to the CUSTOMER via
//   their own bot.
// Fallback (no bound chat): notify the ops bot if configured.
// Always: record the ping in dev_pings so it's inspectable from dashboard/tests.

import type { PoolClient } from 'pg';
import { logInfo, logWarn } from './log';
import { decryptFromBuffers } from './secretbox';

export type FirstPingArgs = {
  appieId: string;
  customerName: string;
  icp: string;
  language: 'nl' | 'en';
  // Real-send inputs. When both resolve, the ping goes to the customer.
  telegramChatId?: string | null;
  botTokenEnc?: Buffer | Uint8Array | null;
  botTokenNonce?: Buffer | Uint8Array | null;
};

function renderFirstPing(args: FirstPingArgs): string {
  if (args.language === 'en') {
    return `Hi ${args.customerName}, your Appie is online. I focus on: ${args.icp}. Reply with anything you want me to take off your plate today.`;
  }
  return `Hoi ${args.customerName}, je Appie staat aan. Ik focus op: ${args.icp}. Stuur me waar ik vandaag aan moet werken.`;
}

// Low-level: send a message to a chat through a specific bot token.
// Throws on transport error; the caller decides how to degrade.
export async function sendCustomerMessage(
  botToken: string,
  chatId: string,
  text: string
): Promise<void> {
  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!res.ok) {
    throw new Error(`telegram sendMessage failed: ${res.status}`);
  }
}

export async function sendFirstPing(
  client: PoolClient,
  args: FirstPingArgs
): Promise<void> {
  const body = renderFirstPing(args);

  // Real customer path: bound chat + decryptable bot token.
  let sentToCustomer = false;
  if (args.telegramChatId && args.botTokenEnc && args.botTokenNonce) {
    try {
      const botToken = decryptFromBuffers(args.botTokenEnc, args.botTokenNonce);
      await sendCustomerMessage(botToken, args.telegramChatId, body);
      sentToCustomer = true;
      logInfo('telegram.first-ping.customer-sent', { appieId: args.appieId });
    } catch (err) {
      logWarn('telegram.first-ping.customer-failed', { error: String(err) });
    }
  }

  // Fallback: ops-bot notification when no customer chat was reached.
  if (!sentToCustomer) {
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
  }

  // Always record in dev_pings so it's inspectable from the dashboard / tests.
  await client.query(
    `INSERT INTO dev_pings (appie_id, body) VALUES ($1, $2)`,
    [args.appieId, body]
  );
  logInfo('telegram.first-ping.recorded', { appieId: args.appieId, sentToCustomer });
}
