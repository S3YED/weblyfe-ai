// Provisioning orchestrator. Tries Orgo (primary) first; on a ProvisionerError
// (paid-plan-required included) logs the reason and falls back to Hetzner.
// Records which provider actually created the box so status/destroy route to it.
//
// Seyed decision 2026-06-07: Orgo primary, Hetzner fallback.

import { logInfo, logWarn } from '../log';
import { orgoProvisioner } from './orgo';
import { hetznerProvisioner } from './hetzner';
import {
  ProvisionerError,
  type ProvisionInput,
  type ProvisionResult,
  type ProvisionStatus,
  type Provisioner,
} from './types';

export type ProvisionOutcome = ProvisionResult & {
  // Which provider actually built the box. Persisted on the appie row.
  readonly provider: 'orgo' | 'hetzner';
};

// Ordered list: primary first, fallbacks after. Injectable for tests.
export function defaultProviderChain(): readonly Provisioner[] {
  return [orgoProvisioner, hetznerProvisioner];
}

// Try each provider in order. A ProvisionerError advances to the next provider;
// any other error is a real bug and bubbles up immediately.
export async function provision(
  input: ProvisionInput,
  chain: readonly Provisioner[] = defaultProviderChain()
): Promise<ProvisionOutcome> {
  let lastError: ProvisionerError | null = null;

  for (const provider of chain) {
    try {
      const result = await provider.create(input);
      logInfo('provision.provider.selected', {
        provider: provider.name,
        appieId: input.appieId,
        providerId: result.providerId,
      });
      return { ...result, provider: provider.name };
    } catch (err) {
      if (err instanceof ProvisionerError) {
        // Expected, fallback-worthy failure. Log + try the next provider.
        logWarn('provision.provider.fallback', {
          provider: provider.name,
          code: err.code,
          reason: err.message,
          appieId: input.appieId,
        });
        lastError = err;
        continue;
      }
      // Unexpected error: do not silently swallow, do not fall back.
      throw err;
    }
  }

  // Every provider failed in a fallback-worthy way.
  logWarn('provision.exhausted', {
    appieId: input.appieId,
    lastCode: lastError?.code ?? 'unknown',
  });
  throw new ProvisionerError(
    'hetzner',
    lastError?.code ?? 'unknown',
    `All providers failed. Last: ${lastError?.message ?? 'unknown'}`,
    lastError
  );
}

// Resolve a provider by its recorded name (for status/destroy on an existing box).
export function providerByName(
  name: string,
  chain: readonly Provisioner[] = defaultProviderChain()
): Provisioner | null {
  return chain.find((p) => p.name === name) ?? null;
}

export async function getStatus(
  provider: string,
  providerId: string
): Promise<ProvisionStatus> {
  const p = providerByName(provider);
  if (!p) return { ready: false, percent: 0 };
  return p.getStatus(providerId);
}

export async function destroy(provider: string, providerId: string): Promise<void> {
  const p = providerByName(provider);
  if (!p) return;
  await p.destroy(providerId);
}

export { ProvisionerError } from './types';
export type { ProvisionInput, ProvisionResult, Provisioner } from './types';
