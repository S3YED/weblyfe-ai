// Instant Appie on-box agent.
//
// A small, self-contained Node program that runs ON the customer's box and IS
// the customer's Appie. It:
//   - reads config from /etc/appie/{bot.env,llm.env,SOUL.md}
//   - long-polls Telegram (getUpdates) with the customer's bot token, so it
//     works behind a deny-incoming firewall (no inbound webhook / open port)
//   - on each text message: calls OpenRouter chat/completions (primary model,
//     falls back to backup model on error) with a SOUL-derived system prompt +
//     short rolling conversation memory, then replies via sendMessage
//   - on each voice message: downloads via getFile, transcribes with
//     faster-whisper (best-effort), feeds the transcript to the LLM
//   - posts a heartbeat to APP_URL/api/appie/heartbeat periodically
//
// Zero npm deps: only Node built-ins + global fetch (Node 22). Config files are
// mode 600; this program never logs secrets.

import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';

// Config + state dirs. Default to the box layout; overridable for local testing.
const ETC = process.env.APPIE_ETC || '/etc/appie';
const STATE_DIR = process.env.APPIE_STATE || '/var/lib/appie';
const HISTORY_MAX = 12; // rolling turns kept per chat (user+assistant interleaved)
const POLL_TIMEOUT_S = 50; // Telegram long-poll seconds
const HEARTBEAT_MS = 60_000;

// ---------------------------------------------------------------------------
// Config loading. Parses simple KEY=VALUE env files (mode 600 on the box).
// ---------------------------------------------------------------------------
function parseEnvFile(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const raw of readFileSync(path, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    out[line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
  }
  return out;
}

function loadConfig() {
  const bot = parseEnvFile(join(ETC, 'bot.env'));
  const llm = parseEnvFile(join(ETC, 'llm.env'));
  const soulPath = join(ETC, 'SOUL.md');
  const altSoul = '/opt/appie/SOUL.md';
  let soul = '';
  if (existsSync(soulPath)) soul = readFileSync(soulPath, 'utf8');
  else if (existsSync(altSoul)) soul = readFileSync(altSoul, 'utf8');

  const cfg = {
    botToken: bot.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || '',
    openRouterKey: llm.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || '',
    model: llm.OPENROUTER_MODEL || process.env.OPENROUTER_MODEL || 'nvidia/nemotron-3-super-120b-a12b:free',
    backupModel: llm.OPENROUTER_BACKUP_MODEL || process.env.OPENROUTER_BACKUP_MODEL || 'deepseek/deepseek-v4-pro',
    appieId: llm.APPIE_ID || process.env.APPIE_ID || '',
    appUrl: (llm.APP_URL || process.env.APP_URL || '').replace(/\/$/, ''),
    soul: soul.trim(),
  };
  if (!cfg.botToken) throw new Error('missing TELEGRAM_BOT_TOKEN');
  if (!cfg.openRouterKey) throw new Error('missing OPENROUTER_API_KEY');
  return cfg;
}

// Heartbeat secret lives in heartbeat.env (separate 600 file).
function loadHeartbeat() {
  const hb = parseEnvFile(join(ETC, 'heartbeat.env'));
  return {
    url: hb.APPIE_HEARTBEAT_URL || '',
    id: hb.APPIE_ID || '',
    secret: hb.APPIE_SECRET || '',
  };
}

// ---------------------------------------------------------------------------
// Structured logging (NO secrets). systemd captures stdout into the journal.
// ---------------------------------------------------------------------------
function log(event, fields = {}) {
  const rec = { ts: new Date().toISOString(), event, ...fields };
  process.stdout.write(JSON.stringify(rec) + '\n');
}

// ---------------------------------------------------------------------------
// Rolling conversation memory. One JSON file per chat under STATE_DIR. Small,
// local, survives restarts. Immutable updates (new array each turn).
// ---------------------------------------------------------------------------
function historyPath(chatId) {
  return join(STATE_DIR, `chat-${chatId}.json`);
}
function readHistory(chatId) {
  const p = historyPath(chatId);
  if (!existsSync(p)) return [];
  try {
    const data = JSON.parse(readFileSync(p, 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
async function appendHistory(chatId, userTurn, assistantTurn) {
  const prev = readHistory(chatId);
  const next = [...prev, userTurn, assistantTurn].slice(-HISTORY_MAX);
  await writeFile(historyPath(chatId), JSON.stringify(next), { mode: 0o600 });
  return next;
}

// ---------------------------------------------------------------------------
// OpenRouter chat. Tries primary, falls back to backup on any failure.
// ---------------------------------------------------------------------------
function systemPrompt(soul) {
  const base = soul && soul.length > 0
    ? soul
    : 'Je bent Appie, een persoonlijke Techwiz. Warm, beknopt, professioneel. Geen corporate fluff.';
  return [
    base,
    '',
    'Je praat via Telegram met de klant. Houd antwoorden kort en natuurlijk.',
    'Voicenotes-first: moedig de klant aan om gewoon in te spreken; je verstaat spraak.',
    'Geen em-dashes. Spiegel de taal van de klant (Nederlands of Engels).',
  ].join('\n');
}

async function callOpenRouter(cfg, messages, model) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${cfg.openRouterKey}`,
      'content-type': 'application/json',
      'http-referer': cfg.appUrl || 'https://weblyfe.ai',
      'x-title': 'Instant Appie Box',
    },
    body: JSON.stringify({ model, messages, max_tokens: 800, temperature: 0.7 }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`openrouter ${res.status}: ${text.slice(0, 200)}`);
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('openrouter: bad JSON');
  }
  const reply = parsed?.choices?.[0]?.message?.content;
  if (!reply || typeof reply !== 'string') throw new Error('openrouter: empty reply');
  return reply.trim();
}

async function generateReply(cfg, chatId, userText) {
  const history = readHistory(chatId);
  const messages = [
    { role: 'system', content: systemPrompt(cfg.soul) },
    ...history,
    { role: 'user', content: userText.slice(0, 4000) },
  ];
  // Primary -> backup.
  for (const [tier, model] of [['primary', cfg.model], ['backup', cfg.backupModel]]) {
    if (!model) continue;
    try {
      const reply = await callOpenRouter(cfg, messages, model);
      log('llm.reply', { tier, model, chatId, ok: true, chars: reply.length });
      return reply;
    } catch (err) {
      log('llm.error', { tier, model, chatId, error: String(err).slice(0, 200) });
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Telegram client (long polling).
// ---------------------------------------------------------------------------
function tgUrl(cfg, method) {
  return `https://api.telegram.org/bot${cfg.botToken}/${method}`;
}
function tgFileUrl(cfg, filePath) {
  return `https://api.telegram.org/file/bot${cfg.botToken}/${filePath}`;
}

async function tgCall(cfg, method, body) {
  const res = await fetch(tgUrl(cfg, method), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(`telegram ${method}: ${data.description || res.status}`);
  return data.result;
}

async function sendMessage(cfg, chatId, text) {
  return tgCall(cfg, 'sendMessage', { chat_id: chatId, text });
}

async function sendChatAction(cfg, chatId, action) {
  try {
    await tgCall(cfg, 'sendChatAction', { chat_id: chatId, action });
  } catch {
    /* best-effort typing indicator */
  }
}

// ---------------------------------------------------------------------------
// Voice: getFile -> download -> faster-whisper transcribe (best-effort).
// ---------------------------------------------------------------------------
function runWhisper(audioPath) {
  // Uses the faster-whisper CLI installed at box build time. Output goes to a
  // .txt alongside the audio. We resolve when the process exits.
  return new Promise((resolve) => {
    const outDir = tmpdir();
    const args = [
      audioPath,
      '--model', 'base',
      '--language', 'auto',
      '--output_format', 'txt',
      '--output_dir', outDir,
    ];
    let stderr = '';
    let proc;
    try {
      proc = spawn('faster-whisper', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (err) {
      resolve({ ok: false, error: `spawn: ${String(err)}` });
      return;
    }
    proc.stderr.on('data', (d) => (stderr += d.toString()));
    proc.on('error', (err) => resolve({ ok: false, error: String(err) }));
    proc.on('close', (code) => {
      if (code !== 0) {
        resolve({ ok: false, error: `exit ${code}: ${stderr.slice(0, 200)}` });
        return;
      }
      // faster-whisper CLI writes <basename>.txt into output_dir.
      const base = audioPath.split('/').pop().replace(/\.[^.]+$/, '');
      const txtPath = join(outDir, `${base}.txt`);
      if (!existsSync(txtPath)) {
        resolve({ ok: false, error: 'no transcript file' });
        return;
      }
      resolve({ ok: true, text: readFileSync(txtPath, 'utf8').trim() });
    });
  });
}

async function transcribeVoice(cfg, fileId) {
  const file = await tgCall(cfg, 'getFile', { file_id: fileId });
  if (!file?.file_path) return { ok: false, error: 'no file_path' };
  const res = await fetch(tgFileUrl(cfg, file.file_path));
  if (!res.ok) return { ok: false, error: `download ${res.status}` };
  const buf = Buffer.from(await res.arrayBuffer());
  const localPath = join(tmpdir(), `voice-${Date.now()}.oga`);
  await writeFile(localPath, buf);
  return runWhisper(localPath);
}

// ---------------------------------------------------------------------------
// Message handling.
// ---------------------------------------------------------------------------
async function handleMessage(cfg, msg) {
  const chatId = msg?.chat?.id;
  if (!chatId) return;

  let userText = '';
  let viaVoice = false;

  if (msg.text) {
    userText = msg.text;
  } else if (msg.voice || msg.audio) {
    viaVoice = true;
    const fileId = (msg.voice || msg.audio).file_id;
    await sendChatAction(cfg, chatId, 'typing');
    const tr = await transcribeVoice(cfg, fileId);
    if (tr.ok && tr.text) {
      userText = tr.text;
      log('voice.transcribed', { chatId, chars: userText.length });
    } else {
      log('voice.failed', { chatId, error: tr.error });
      await sendMessage(
        cfg,
        chatId,
        'Ik kon je spraakbericht even niet verstaan. Kun je het typen? (spraak komt zo terug)'
      );
      return;
    }
  } else {
    return; // ignore stickers/photos/etc for now
  }

  await sendChatAction(cfg, chatId, 'typing');
  const reply = await generateReply(cfg, chatId, userText);
  if (!reply) {
    await sendMessage(cfg, chatId, 'Sorry, ik kon even geen antwoord genereren. Probeer het zo nog eens.');
    return;
  }
  await sendMessage(cfg, chatId, reply);
  await appendHistory(
    chatId,
    { role: 'user', content: userText.slice(0, 2000) },
    { role: 'assistant', content: reply }
  );
  log('message.handled', { chatId, viaVoice });
}

// ---------------------------------------------------------------------------
// Heartbeat loop (independent of the message loop).
// ---------------------------------------------------------------------------
function startHeartbeat() {
  const hb = loadHeartbeat();
  if (!hb.url || !hb.id || !hb.secret) {
    log('heartbeat.skip', { reason: 'not-configured' });
    return;
  }
  const ping = async () => {
    try {
      const res = await fetch(hb.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ appie_id: hb.id, secret: hb.secret }),
      });
      log('heartbeat.sent', { status: res.status });
    } catch (err) {
      log('heartbeat.error', { error: String(err).slice(0, 120) });
    }
  };
  ping();
  setInterval(ping, HEARTBEAT_MS);
}

// ---------------------------------------------------------------------------
// Main long-poll loop.
// ---------------------------------------------------------------------------
async function main() {
  if (!existsSync(STATE_DIR)) mkdirSync(STATE_DIR, { recursive: true, mode: 0o700 });
  const cfg = loadConfig();
  log('agent.start', {
    appieId: cfg.appieId || null,
    model: cfg.model,
    backupModel: cfg.backupModel,
    hasSoul: cfg.soul.length > 0,
  });

  // Clear any stale webhook so getUpdates works (mutually exclusive on Telegram).
  try {
    await tgCall(cfg, 'deleteWebhook', { drop_pending_updates: false });
  } catch (err) {
    log('telegram.deleteWebhook.error', { error: String(err).slice(0, 120) });
  }

  startHeartbeat();

  let offset = 0;
  // Long-poll forever. Each error backs off briefly; never crashes the service.
  for (;;) {
    try {
      const updates = await tgCall(cfg, 'getUpdates', {
        offset,
        timeout: POLL_TIMEOUT_S,
        allowed_updates: ['message'],
      });
      for (const u of updates) {
        offset = u.update_id + 1;
        if (u.message) {
          handleMessage(cfg, u.message).catch((err) =>
            log('message.error', { error: String(err).slice(0, 200) })
          );
        }
      }
    } catch (err) {
      log('poll.error', { error: String(err).slice(0, 200) });
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

main().catch((err) => {
  log('agent.fatal', { error: String(err).slice(0, 300) });
  process.exit(1);
});
