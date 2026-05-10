// Real Hetzner Cloud API provisioner.
// TODO: Production cutover requires Hetzner Cloud API key + STRIPE_LIVE_OK: provision_real_servers approval.
// At time of writing this module is intentionally NOT wired. /appie/api/provision
// always uses hetzner-mock unless HETZNER_API_KEY is set AND PROVISION_MODE=real.

import { logInfo } from './log';

export async function provisionRealCx32(_args: {
  userId: string;
  email: string;
  sshPubkey: string;
  cloudInitYaml: string;
}): Promise<never> {
  logInfo('hetzner.provision.blocked', {
    reason: 'real-provision-disabled-pre-approval',
  });
  throw new Error(
    'Real Hetzner provisioning is disabled. Set PROVISION_MODE=real and obtain STRIPE_LIVE_OK: provision_real_servers approval before enabling.'
  );
}

export function isRealProvisionEnabled(): boolean {
  return Boolean(process.env.HETZNER_API_KEY) && process.env.PROVISION_MODE === 'real';
}
