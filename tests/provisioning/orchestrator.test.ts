import { describe, it, expect } from 'vitest';
import { provision } from '../../src/lib/provisioning';
import {
  ProvisionerError,
  type Provisioner,
  type ProvisionInput,
} from '../../src/lib/provisioning/types';

const INPUT: ProvisionInput = {
  appieId: 'appie-1',
  heartbeatSecret: 'secret',
  appUrl: 'https://dash.weblyfe.ai',
  botToken: '123:abc',
  onboardingState: { name: 'Eva', icp: 'makelaars' },
};

function fakeProvider(
  name: 'orgo' | 'hetzner',
  behaviour: 'ok' | ProvisionerError
): Provisioner {
  return {
    name,
    async create() {
      if (behaviour !== 'ok') throw behaviour;
      return { providerId: `${name}-id`, host: `${name}-host`, ip: '1.2.3.4' };
    },
    async getStatus() {
      return { ready: true, percent: 100 };
    },
    async destroy() {},
  };
}

describe('provision orchestrator', () => {
  it('uses the primary provider when it succeeds', async () => {
    const chain = [fakeProvider('orgo', 'ok'), fakeProvider('hetzner', 'ok')];
    const out = await provision(INPUT, chain);
    expect(out.provider).toBe('orgo');
    expect(out.providerId).toBe('orgo-id');
  });

  it('falls back to Hetzner on a paid-plan ProvisionerError', async () => {
    const paidPlan = new ProvisionerError('orgo', 'paid-plan-required', 'requires a paid plan');
    const chain = [fakeProvider('orgo', paidPlan), fakeProvider('hetzner', 'ok')];
    const out = await provision(INPUT, chain);
    expect(out.provider).toBe('hetzner');
    expect(out.providerId).toBe('hetzner-id');
  });

  it('falls back on any ProvisionerError (create-failed)', async () => {
    const createFailed = new ProvisionerError('orgo', 'create-failed', 'orgo 500');
    const chain = [fakeProvider('orgo', createFailed), fakeProvider('hetzner', 'ok')];
    const out = await provision(INPUT, chain);
    expect(out.provider).toBe('hetzner');
  });

  it('throws when every provider fails with a ProvisionerError', async () => {
    const a = new ProvisionerError('orgo', 'transport', 'orgo down');
    const b = new ProvisionerError('hetzner', 'create-failed', 'hetzner down');
    const chain = [fakeProvider('orgo', a), fakeProvider('hetzner', b)];
    await expect(provision(INPUT, chain)).rejects.toBeInstanceOf(ProvisionerError);
  });

  it('does NOT fall back on an unexpected (non-ProvisionerError) error', async () => {
    const boom: Provisioner = {
      name: 'orgo',
      async create() {
        throw new TypeError('unexpected bug');
      },
      async getStatus() {
        return { ready: false, percent: 0 };
      },
      async destroy() {},
    };
    const chain = [boom, fakeProvider('hetzner', 'ok')];
    await expect(provision(INPUT, chain)).rejects.toBeInstanceOf(TypeError);
  });
});
