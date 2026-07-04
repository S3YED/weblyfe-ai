// Mock Hetzner provisioner.
// Simulates the 6 steps from PRD acceptance criterion 3:
//   server-creating, network-attaching, cloud-init-running,
//   telegram-bot-leasing, agent-starting, first-ping
// totalling ~30s in dev/preview.

export type ProvisionStep =
  | 'queued'
  | 'server-creating'
  | 'network-attaching'
  | 'cloud-init-running'
  | 'telegram-bot-leasing'
  | 'agent-starting'
  | 'first-ping'
  | 'online';

export const STEP_ORDER: ProvisionStep[] = [
  'queued',
  'server-creating',
  'network-attaching',
  'cloud-init-running',
  'telegram-bot-leasing',
  'agent-starting',
  'first-ping',
  'online',
];

export const STEP_LABELS: Record<ProvisionStep, string> = {
  queued: 'In de wachtrij',
  'server-creating': 'Server wordt aangemaakt (Hetzner CX32)',
  'network-attaching': 'Netwerk en firewall configureren',
  'cloud-init-running': 'Cloud-init draait, software installeren',
  'telegram-bot-leasing': 'Telegram bot uit pool leasen',
  'agent-starting': 'Hermes agent starten',
  'first-ping': 'Eerste persoonlijke ping versturen',
  online: 'Online',
};

const STEP_DURATION_MS = 5000; // ~5s per step in mock; 6 active steps * 5s = 30s

export function computeMockProgress(startedAt: Date, now: Date = new Date()): {
  step: ProvisionStep;
  percent: number;
} {
  const elapsed = Math.max(0, now.getTime() - startedAt.getTime());
  const totalSteps = STEP_ORDER.length - 1; // exclude 'queued' or 'online' from active count
  const idx = Math.min(STEP_ORDER.length - 1, Math.floor(elapsed / STEP_DURATION_MS) + 1);
  const step = STEP_ORDER[idx];
  const percent = Math.min(100, Math.round((idx / totalSteps) * 100));
  return { step, percent };
}

export type MockProvisionResult = {
  provisionId: string;
  hetznerServerId: string;
  hetznerIp: string;
  telegramBotUsername: string;
  telegramBotToken: string;
  sshPubkey: string;
};

// Returns deterministic-ish mock data tied to userId.
export function buildMockProvisionResult(userId: string): MockProvisionResult {
  const short = userId.replace(/-/g, '').slice(0, 8);
  return {
    provisionId: `prov_mock_${short}`,
    hetznerServerId: `mock-${short}`,
    hetznerIp: `10.${parseInt(short.slice(0, 2), 16) % 255}.${parseInt(short.slice(2, 4), 16) % 255}.${parseInt(short.slice(4, 6), 16) % 255}`,
    telegramBotUsername: `appie_${short}_bot`,
    telegramBotToken: `${parseInt(short, 16)}:MOCK${short.toUpperCase()}DEVTOKENABCDEFGHIJKLMNO`,
    sshPubkey: `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5MOCK${short}`,
  };
}
