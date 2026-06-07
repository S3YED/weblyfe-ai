// Compatibility shim. The real Hetzner provisioner now lives in
// src/lib/provisioning/hetzner.ts (driven by the Orgo->Hetzner orchestrator in
// src/lib/provisioning/index.ts). This module is kept so any older imports keep
// resolving; new code should import from '@/lib/provisioning'.

export { hetznerProvisioner, HetznerProvisioner } from './provisioning/hetzner';

// Real provisioning is gated on PROVISION_MODE=real + a provider token.
// (Historically this was a hard-throw stub; the gate now lives in the provision
// route via PROVISION_MODE, with the orchestrator emitting per-provider
// not-configured errors when a token is missing.)
export function isRealProvisionEnabled(): boolean {
  return (
    Boolean(process.env.HETZNER_API_TOKEN ?? process.env.HETZNER_API_KEY) &&
    process.env.PROVISION_MODE === 'real'
  );
}
