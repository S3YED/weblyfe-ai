// Shared box-setup logic for both provisioners.
//
// Produces the bash that runs ON the customer box to:
//   1. install the Hermes agent + Node 22
//   2. write the per-customer config (bot token + onboarding SOUL)
//   3. inject identity (appie_id + heartbeat_secret + app URL)
//   4. start a heartbeat loop that POSTs {appie_id, secret} to
//      <APP_URL>/api/appie/heartbeat (honours the P0 seam)
//
// Orgo runs this via the computer exec/bash capability; Hetzner runs the same
// payload through cloud-init `runcmd`. Keeping it in one place means both paths
// install identically.

import type { ProvisionInput } from './types';
import { BOX_AGENT_SOURCE_B64, BOX_AGENT_SERVICE_B64 } from './box-agent-embed';

// Minimal SOUL derived from onboarding answers when no pre-rendered SOUL given.
function deriveSoul(input: ProvisionInput): string {
  if (input.soul) return input.soul;
  const o = input.onboardingState as {
    name?: string;
    icp?: string;
    voiceTone?: string;
    voiceLanguage?: string;
  };
  const name = o.name ?? 'Appie';
  const icp = o.icp ?? 'the customer';
  const tone = o.voiceTone ?? 'warm, concise, professional';
  const lang = o.voiceLanguage ?? 'nl';
  return [
    `# ${name} - Instant Appie`,
    ``,
    `You are ${name}, a personal Techwiz for ${icp}.`,
    `Primary language: ${lang}. Tone: ${tone}.`,
    `Stay concise. No corporate fluff. No em dashes.`,
  ].join('\n');
}

// Single-quote-safe heredoc writer: writes `content` to `path` without the
// content being interpreted by the shell (quoted heredoc delimiter).
function writeFileHeredoc(path: string, content: string): string {
  // Use a delimiter unlikely to appear in content.
  const delim = 'WEBLYFE_EOF';
  return [`cat > ${path} <<'${delim}'`, content, delim].join('\n');
}

// Decode a base64 blob to a target path on the box. Base64 survives every layer
// of quoting (heredoc -> YAML -> shell), so the agent source ships intact.
function writeBase64(path: string, b64: string): string {
  const delim = 'WEBLYFE_B64_EOF';
  return [
    `cat > ${path}.b64 <<'${delim}'`,
    b64,
    delim,
    `base64 -d ${path}.b64 > ${path}`,
    `rm -f ${path}.b64`,
  ].join('\n');
}

// Install + start the on-box Appie agent: a self-contained Node program that
// long-polls Telegram with the customer bot token and replies via OpenRouter.
// Requires Node (installed earlier in buildBoxSetup) and the /etc/appie config.
// faster-whisper is best-effort: installed via pip when python3/pip exist; the
// agent degrades to "please type" if the binary is absent.
function agentInstall(): string {
  return [
    // Agent program + systemd unit (base64-decoded to avoid quoting hazards).
    writeBase64('/opt/appie/agent.mjs', BOX_AGENT_SOURCE_B64),
    'chmod 700 /opt/appie/agent.mjs',
    writeBase64('/etc/systemd/system/appie-agent.service', BOX_AGENT_SERVICE_B64),
    'mkdir -p /var/lib/appie && chmod 700 /var/lib/appie',
    // faster-whisper (best-effort: never fail the whole setup on it).
    'apt-get install -y python3 python3-pip ffmpeg || true',
    'pip3 install --break-system-packages faster-whisper || pip3 install faster-whisper || true',
    // Make the systemd unit point at the real node path (nodesource = /usr/bin/node).
    'NODE_BIN="$(command -v node || echo /usr/bin/node)"',
    'sed -i "s#/usr/bin/node#${NODE_BIN}#" /etc/systemd/system/appie-agent.service || true',
    'systemctl daemon-reload || true',
    'systemctl enable --now appie-agent.service || true',
  ].join('\n');
}

// SSH access for ops: add the ops public key to root authorized_keys and allow
// inbound SSH through UFW (UFW otherwise stays deny-incoming). Returns '' when
// no key is provided (Tailscale SSH still works for mesh management).
function sshOpsAccess(pubKey: string | undefined): string {
  if (!pubKey) return '';
  return [
    'mkdir -p /root/.ssh && chmod 700 /root/.ssh',
    'touch /root/.ssh/authorized_keys && chmod 600 /root/.ssh/authorized_keys',
    writeFileHeredoc('/root/.ssh/appie-ops.pub', pubKey.trim()),
    'grep -qxF "$(cat /root/.ssh/appie-ops.pub)" /root/.ssh/authorized_keys || cat /root/.ssh/appie-ops.pub >> /root/.ssh/authorized_keys',
    'rm -f /root/.ssh/appie-ops.pub',
    'ufw allow 22/tcp || true',
  ].join('\n');
}

// The heartbeat loop the box runs to phone home. Posts the seam payload.
// Runs once immediately (fast first-online), then every 60s as a liveness ping.
function heartbeatUnit(appieId: string, secret: string, appUrl: string): string {
  const url = `${appUrl.replace(/\/$/, '')}/api/appie/heartbeat`;
  // The values are written into an env file (mode 600) and referenced, so the
  // secret never appears in the systemd unit text or process args.
  const envFile = '/etc/appie/heartbeat.env';
  const script = '/usr/local/bin/appie-heartbeat.sh';
  const scriptBody = [
    '#!/usr/bin/env bash',
    'set -euo pipefail',
    `source ${envFile}`,
    'curl -fsS -X POST "$APPIE_HEARTBEAT_URL" \\',
    '  -H "content-type: application/json" \\',
    '  -d "{\\"appie_id\\":\\"$APPIE_ID\\",\\"secret\\":\\"$APPIE_SECRET\\"}" || true',
  ].join('\n');

  return [
    'mkdir -p /etc/appie && chmod 700 /etc/appie',
    writeFileHeredoc(
      envFile,
      [
        `APPIE_ID=${appieId}`,
        `APPIE_SECRET=${secret}`,
        `APPIE_HEARTBEAT_URL=${url}`,
      ].join('\n')
    ),
    `chmod 600 ${envFile}`,
    writeFileHeredoc(script, scriptBody),
    `chmod 700 ${script}`,
    // systemd timer: fire once on boot, then every 60s.
    writeFileHeredoc(
      '/etc/systemd/system/appie-heartbeat.service',
      [
        '[Unit]',
        'Description=Appie heartbeat phone-home',
        '[Service]',
        'Type=oneshot',
        `ExecStart=${script}`,
      ].join('\n')
    ),
    writeFileHeredoc(
      '/etc/systemd/system/appie-heartbeat.timer',
      [
        '[Unit]',
        'Description=Run Appie heartbeat on boot + every 60s',
        '[Timer]',
        'OnBootSec=10',
        'OnUnitActiveSec=60',
        '[Install]',
        'WantedBy=timers.target',
      ].join('\n')
    ),
    'systemctl daemon-reload || true',
    'systemctl enable --now appie-heartbeat.timer || true',
    // Immediate first ping so the box flips online fast (don't wait for the timer).
    `bash ${script} || true`,
  ].join('\n');
}

// Full box setup as a single bash payload. `useSystemd` toggles the heartbeat
// install style: Hetzner (cloud-init on a full VM) has systemd; an Orgo desktop
// box may not, so it falls back to a backgrounded loop.
export function buildBoxSetup(
  input: ProvisionInput,
  opts: { useSystemd: boolean }
): string {
  const soul = deriveSoul(input);
  const lines: string[] = [
    'set -euo pipefail',
    'export DEBIAN_FRONTEND=noninteractive',
    // Node 22 (idempotent: skip if already present).
    'command -v node >/dev/null 2>&1 || (curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -y nodejs)',
    'mkdir -p /opt/appie /etc/appie && chmod 700 /etc/appie',
    // Per-customer SOUL (written to both /opt/appie and /etc/appie; the agent
    // reads /etc/appie/SOUL.md first, falls back to /opt/appie/SOUL.md).
    writeFileHeredoc('/opt/appie/SOUL.md', soul),
    writeFileHeredoc('/etc/appie/SOUL.md', soul),
    'chmod 600 /etc/appie/SOUL.md',
    // Bot token in a 600 env file (never an arg / never logged).
    writeFileHeredoc('/etc/appie/bot.env', `TELEGRAM_BOT_TOKEN=${input.botToken}`),
    'chmod 600 /etc/appie/bot.env',
  ];

  // LLM config (OpenRouter key + primary/backup models + identity) in a 600 env
  // file so the on-box agent can call the model. Written only when provided.
  if (input.llm) {
    const appUrl = input.appUrl.replace(/\/$/, '');
    lines.push(
      writeFileHeredoc(
        '/etc/appie/llm.env',
        [
          `OPENROUTER_API_KEY=${input.llm.openRouterKey}`,
          `OPENROUTER_MODEL=${input.llm.model}`,
          `OPENROUTER_BACKUP_MODEL=${input.llm.backupModel ?? ''}`,
          `APPIE_ID=${input.appieId}`,
          `APP_URL=${appUrl}`,
        ].join('\n')
      ),
      'chmod 600 /etc/appie/llm.env'
    );
  }

  if (opts.useSystemd) {
    lines.push(heartbeatUnit(input.appieId, input.heartbeatSecret, input.appUrl));
  } else {
    // No-systemd fallback (Orgo desktop): nohup a simple loop.
    const url = `${input.appUrl.replace(/\/$/, '')}/api/appie/heartbeat`;
    lines.push(
      writeFileHeredoc('/etc/appie/heartbeat.env', [
        `APPIE_ID=${input.appieId}`,
        `APPIE_SECRET=${input.heartbeatSecret}`,
        `APPIE_HEARTBEAT_URL=${url}`,
      ].join('\n')),
      'chmod 600 /etc/appie/heartbeat.env',
      writeFileHeredoc(
        '/usr/local/bin/appie-heartbeat-loop.sh',
        [
          '#!/usr/bin/env bash',
          'set -uo pipefail',
          'source /etc/appie/heartbeat.env',
          'while true; do',
          '  curl -fsS -X POST "$APPIE_HEARTBEAT_URL" \\',
          '    -H "content-type: application/json" \\',
          '    -d "{\\"appie_id\\":\\"$APPIE_ID\\",\\"secret\\":\\"$APPIE_SECRET\\"}" || true',
          '  sleep 60',
          'done',
        ].join('\n')
      ),
      'chmod 700 /usr/local/bin/appie-heartbeat-loop.sh',
      'nohup /usr/local/bin/appie-heartbeat-loop.sh >/var/log/appie-heartbeat.log 2>&1 &'
    );
  }

  // Ops SSH key (so we can shell in and manage/verify the agent) + UFW SSH allow.
  const ssh = sshOpsAccess(input.opsSshPubKey);
  if (ssh) lines.push(ssh);

  // Install + start the real on-box agent LAST: by now Node is present and the
  // /etc/appie config (bot.env, llm.env, heartbeat.env, SOUL.md) is written, so
  // the agent has everything it needs the moment systemd starts it.
  lines.push(agentInstall());

  return lines.join('\n');
}

// cloud-init user-data (YAML) wrapping the same setup payload for Hetzner.
export function buildCloudInit(input: ProvisionInput): string {
  const setup = buildBoxSetup(input, { useSystemd: true });
  // Embed the setup script as a written file then execute it, so quoting in the
  // heredocs survives YAML. cloud-init runs runcmd as root.
  const scriptPath = '/opt/appie/setup.sh';
  // Indent every line of the script by 6 spaces under the YAML literal block.
  const indented = setup
    .split('\n')
    .map((l) => `      ${l}`)
    .join('\n');
  // Ops SSH key block. Injecting via cloud-init's native `ssh_authorized_keys`
  // (applied at first boot, before runcmd) is far more reliable than appending
  // to authorized_keys late in setup.sh, and it stops Hetzner's ubuntu image
  // from leaving root in a password-expired state that blocks key login.
  const sshBlock = input.opsSshPubKey
    ? ['ssh_pwauth: false', 'ssh_authorized_keys:', `  - ${input.opsSshPubKey.trim()}`]
    : [];

  return [
    '#cloud-config',
    'package_update: true',
    'packages:',
    '  - curl',
    '  - git',
    '  - jq',
    '  - ufw',
    '  - fail2ban',
    ...sshBlock,
    'write_files:',
    `  - path: ${scriptPath}`,
    '    permissions: "0700"',
    '    content: |',
    indented,
    'runcmd:',
    '  # Clear any forced root password-change that would block key login.',
    '  - chage -d 99999 root || true',
    '  - passwd -x -1 root || true',
    '  # Tailscale (mesh + SSH); UFW deny-incoming baseline but SSH allowed.',
    '  - curl -fsSL https://tailscale.com/install.sh | sh',
    '  - ufw default deny incoming',
    '  - ufw default allow outgoing',
    '  - ufw allow 22/tcp',
    '  - ufw --force enable',
    `  - bash ${scriptPath}`,
    'final_message: "Appie box ready; agent + heartbeat armed."',
  ].join('\n');
}
