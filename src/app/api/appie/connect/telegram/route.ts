import { NextRequest, NextResponse } from 'next/server';
import { execSync } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import {
  getCheckoutSession,
  getInstanceByCustomer,
  updateChannel,
  createChannel,
} from '@/lib/appie/fleet';

const HETZNER_SSH_KEY = process.env.APPIE_SSH_PRIVATE_KEY?.replace(/\\n/g, '\n');
const HETZNER_SSH_USER = 'root';

interface TelegramBotInfo {
  ok: boolean;
  result?: {
    id: number;
    is_bot: boolean;
    first_name: string;
    username: string;
  };
  description?: string;
}

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { session_id, bot_token } = await req.json();

    if (!session_id || !bot_token) {
      return NextResponse.json({ error: 'Missing session_id or bot_token' }, { status: 400 });
    }

    // 1. Validate token format (rough check)
    if (!/^\d{8,10}:[A-Za-z0-9_-]{22,35}$/.test(bot_token.trim())) {
      return NextResponse.json({ error: 'Invalid token format. Example: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz' }, { status: 400 });
    }

    // 2. Verify token with Telegram API
    const tgRes = await fetch(`https://api.telegram.org/bot${bot_token}/getMe`);
    const tgData: TelegramBotInfo = await tgRes.json();

    if (!tgData.ok || !tgData.result?.is_bot) {
      return NextResponse.json(
        { error: tgData.description || 'Invalid bot token. Make sure you copied the full token from BotFather.' },
        { status: 400 }
      );
    }

    const { id: tg_user_id, first_name: bot_name, username: bot_username } = tgData.result;

    // 3. Look up checkout session -> customer -> instance
    const session = await getCheckoutSession(session_id);
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const instance = await getInstanceByCustomer(session.customer_id);
    if (!instance) {
      return NextResponse.json({ error: 'Instance not found' }, { status: 404 });
    }

    // 4. SSH into the VPS and configure Hermes with the bot token
    if (instance.server_ip) {
      const sshOk = await configureTelegramOnVPS(instance.server_ip, bot_token);
      if (!sshOk) {
        return NextResponse.json(
          { error: 'Could not connect to your Appie server. Please try again in a few minutes.' },
          { status: 500 }
        );
      }
    }

    // 5. Update channel in DB
    await createChannel(instance.id, 'telegram');
    await updateChannel(instance.id, 'telegram', {
      status: 'active',
      bot_username: bot_username,
      bot_name: bot_name,
      external_user_id: String(tg_user_id),
      connected_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      bot_username,
      bot_name,
    });
  } catch (err) {
    console.error('[/api/appie/connect/telegram]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── SSH into customer VPS and configure Hermes telegram ───────────────────────

async function configureTelegramOnVPS(serverIp: string, botToken: string): Promise<boolean> {
  if (!HETZNER_SSH_KEY) {
    console.warn('[configureTelegramOnVPS] No SSH key configured — skipping SSH');
    return process.env.NODE_ENV === 'development';
  }

  const keyPath = join(tmpdir(), `apie-ssh-${Date.now()}.key`);

  try {
    writeFileSync(keyPath, HETZNER_SSH_KEY, { mode: 0o600 });

    execSync(
      [
        'ssh',
        '-o', 'StrictHostKeyChecking=no',
        '-o', 'UserKnownHostsFile=/dev/null',
        '-o', 'ConnectTimeout=15',
        '-i', keyPath,
        `${HETZNER_SSH_USER}@${serverIp}`,
        [
          'mkdir -p ~/.hermes',
          `grep -q "TELEGRAM_BOT_TOKEN" ~/.hermes/.env && sed -i "s/TELEGRAM_BOT_TOKEN=.*/TELEGRAM_BOT_TOKEN=${botToken}/" ~/.hermes/.env || echo "TELEGRAM_BOT_TOKEN=${botToken}" >> ~/.hermes/.env`,
          '(sudo systemctl restart hermes-gateway 2>/dev/null || sudo systemctl restart openclaw 2>/dev/null || pkill -HUP hermes 2>/dev/null || pkill -HUP openclaw 2>/dev/null || true)',
        ].join(' && '),
      ].join(' '),
      { timeout: 30000 }
    );

    return true;
  } catch (err) {
    console.error('[SSH configure Telegram]', err);
    return false;
  } finally {
    try { unlinkSync(keyPath); } catch { /* ignore */ }
  }
}
