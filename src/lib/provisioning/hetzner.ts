// Hetzner provisioner - FALLBACK path. Ports appie-saas/scripts/provision.sh to
// TS over the Hetzner Cloud API (https://api.hetzner.cloud/v1).
//
// Creates a CX32 ubuntu-24.04 server with cloud-init user-data that installs
// Node/Tailscale/UFW + Hermes, injects identity (appie_id/heartbeat_secret/
// appUrl) and the bot token, and arms the heartbeat (see box-setup.ts).
//
// Reads HETZNER_API_TOKEN (preferred) or HETZNER_API_KEY (legacy name already
// used elsewhere in this app) from env. Never hardcodes the token.

import { buildCloudInit } from './box-setup';
import {
  ProvisionerError,
  type ProvisionInput,
  type ProvisionResult,
  type ProvisionStatus,
  type Provisioner,
} from './types';

const HETZNER_BASE_URL = 'https://api.hetzner.cloud/v1';
// Server type meeting Hermes >=8GB/4CPU. The legacy `cx32` line was retired by
// Hetzner; the current shared-vCPU line is `cx*3` (cx33 = 4 vCPU / 8GB) and the
// AMD line is `cpx31`/`cpx32`. Default to cx33 (nbg1) but allow ops override via
// HETZNER_SERVER_TYPE without a code change.
const SERVER_TYPE = process.env.HETZNER_SERVER_TYPE ?? 'cx33';
const IMAGE = 'ubuntu-24.04';
const LOCATION = process.env.HETZNER_LOCATION ?? 'nbg1';

function getToken(): string {
  const token = process.env.HETZNER_API_TOKEN ?? process.env.HETZNER_API_KEY;
  if (!token) {
    throw new ProvisionerError(
      'hetzner',
      'not-configured',
      'HETZNER_API_TOKEN (or HETZNER_API_KEY) not set'
    );
  }
  return token;
}

async function hetznerFetch(
  path: string,
  init: { method: string; body?: unknown }
): Promise<Response> {
  const token = getToken();
  try {
    return await fetch(`${HETZNER_BASE_URL}${path}`, {
      method: init.method,
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    });
  } catch (err) {
    throw new ProvisionerError('hetzner', 'transport', `hetzner fetch ${path} failed`, err);
  }
}

export class HetznerProvisioner implements Provisioner {
  readonly name = 'hetzner' as const;

  async create(input: ProvisionInput): Promise<ProvisionResult> {
    const userData = buildCloudInit(input);
    const res = await hetznerFetch('/servers', {
      method: 'POST',
      body: {
        name: `appie-${input.appieId}`,
        server_type: SERVER_TYPE,
        image: IMAGE,
        location: LOCATION,
        user_data: userData,
        start_after_create: true,
        labels: {
          managed_by: 'instant-appie',
          appie_id: input.appieId,
        },
        public_net: { enable_ipv4: true, enable_ipv6: true },
      },
    });

    const text = await res.text();
    if (!res.ok) {
      throw new ProvisionerError(
        'hetzner',
        'create-failed',
        `hetzner create returned ${res.status}`,
        text
      );
    }

    let parsed: { server?: { id?: number; public_net?: { ipv4?: { ip?: string } } } };
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      throw new ProvisionerError('hetzner', 'create-failed', 'hetzner create: bad JSON', err);
    }
    const server = parsed.server;
    if (!server?.id) {
      throw new ProvisionerError(
        'hetzner',
        'create-failed',
        'hetzner create returned no server id',
        text
      );
    }

    return {
      providerId: String(server.id),
      host: `appie-${input.appieId}`,
      ip: server.public_net?.ipv4?.ip,
    };
  }

  async getStatus(providerId: string): Promise<ProvisionStatus> {
    const res = await hetznerFetch(`/servers/${providerId}`, { method: 'GET' });
    if (!res.ok) {
      return { ready: false, percent: 40 };
    }
    const body = (await res.json()) as { server?: { status?: string } };
    const status = body.server?.status;
    // 'running' = VM booted; cloud-init still finishing. The authoritative
    // online flip comes from the box heartbeat, so cap at 90 until then.
    const ready = status === 'running';
    return { ready, percent: ready ? 90 : 40 };
  }

  async destroy(providerId: string): Promise<void> {
    const res = await hetznerFetch(`/servers/${providerId}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 404) {
      throw new ProvisionerError(
        'hetzner',
        'unknown',
        `hetzner destroy returned ${res.status}`
      );
    }
  }
}

export const hetznerProvisioner = new HetznerProvisioner();
