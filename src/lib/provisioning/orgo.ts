// Orgo provisioner - PRIMARY path (Seyed decision 2026-06-07).
//
// The Python/TS Orgo SDK is not callable from a Next serverless function, so we
// drive Orgo over its REST API directly with fetch + ORGO_API_KEY.
//   Base URL: https://www.orgo.ai/api/v1  (per skills/orgo/SKILL.md)
//   POST /computers              -> create a computer
//   POST /computers/{id}/exec    -> run bash on the computer
//   GET  /computers/{id}         -> status
//   DELETE /computers/{id}       -> destroy
//
// Orgo create requires ram in {4,8,16,32,64}; Hermes needs >=8GB/4CPU, so we
// request ram:8, cpu:4. The account currently needs a PAID PLAN to create
// computers; that error (and any other failure) is converted into a typed
// ProvisionerError so the orchestrator degrades gracefully to Hetzner.

import { buildBoxSetup } from './box-setup';
import {
  ProvisionerError,
  type ProvisionInput,
  type ProvisionResult,
  type ProvisionStatus,
  type Provisioner,
} from './types';

const ORGO_BASE_URL = process.env.ORGO_BASE_URL ?? 'https://www.orgo.ai/api/v1';
const ORGO_RAM = 8 as const; // must be one of {4,8,16,32,64}; Hermes needs >=8
const ORGO_CPU = 4 as const;

function getApiKey(): string {
  const key = process.env.ORGO_API_KEY;
  if (!key) {
    throw new ProvisionerError('orgo', 'not-configured', 'ORGO_API_KEY not set');
  }
  return key;
}

// True when an Orgo error message indicates the account lacks a paid plan.
// Orgo returns text like "requires a paid plan" / "upgrade your plan".
function isPaidPlanError(status: number, bodyText: string): boolean {
  const t = bodyText.toLowerCase();
  return (
    status === 402 ||
    t.includes('paid plan') ||
    t.includes('requires a paid') ||
    t.includes('upgrade your plan') ||
    t.includes('subscription required')
  );
}

async function orgoFetch(
  path: string,
  init: { method: string; body?: unknown }
): Promise<Response> {
  const key = getApiKey();
  try {
    return await fetch(`${ORGO_BASE_URL}${path}`, {
      method: init.method,
      headers: {
        authorization: `Bearer ${key}`,
        'content-type': 'application/json',
      },
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    });
  } catch (err) {
    throw new ProvisionerError('orgo', 'transport', `orgo fetch ${path} failed`, err);
  }
}

// Read the body once as text so we can both classify errors and parse JSON.
async function readBody(res: Response): Promise<{ text: string; json: unknown }> {
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { text, json };
}

export class OrgoProvisioner implements Provisioner {
  readonly name = 'orgo' as const;

  async create(input: ProvisionInput): Promise<ProvisionResult> {
    // 1. Create the computer (one per tenant; workspace keyed by appieId).
    const res = await orgoFetch('/computers', {
      method: 'POST',
      body: {
        workspace: `customer-${input.appieId}`,
        ram: ORGO_RAM,
        cpu: ORGO_CPU,
      },
    });

    const { text, json } = await readBody(res);
    if (!res.ok) {
      if (isPaidPlanError(res.status, text)) {
        throw new ProvisionerError(
          'orgo',
          'paid-plan-required',
          'Orgo account requires a paid plan to create computers',
          text
        );
      }
      throw new ProvisionerError(
        'orgo',
        'create-failed',
        `orgo create returned ${res.status}`,
        text
      );
    }

    const created = (json ?? {}) as {
      id?: string;
      computer_id?: string;
      ip?: string;
      host?: string;
    };
    const providerId = created.id ?? created.computer_id;
    if (!providerId) {
      throw new ProvisionerError(
        'orgo',
        'create-failed',
        'orgo create returned no computer id',
        text
      );
    }

    // 2. Run box setup on the computer (install Hermes, write config + SOUL,
    //    inject identity, arm heartbeat). Orgo desktop boxes may not run systemd,
    //    so use the nohup-loop heartbeat variant.
    const setupScript = buildBoxSetup(input, { useSystemd: false });
    const execRes = await orgoFetch(`/computers/${providerId}/exec`, {
      method: 'POST',
      body: { command: setupScript },
    });
    if (!execRes.ok) {
      const execBody = await execRes.text();
      // Best-effort cleanup so we don't leak a half-built tenant box.
      await this.destroy(providerId).catch(() => undefined);
      throw new ProvisionerError(
        'orgo',
        'setup-failed',
        `orgo exec returned ${execRes.status}`,
        execBody
      );
    }

    return {
      providerId,
      host: created.host ?? `customer-${input.appieId}`,
      ip: created.ip,
    };
  }

  async getStatus(providerId: string): Promise<ProvisionStatus> {
    const res = await orgoFetch(`/computers/${providerId}`, { method: 'GET' });
    if (!res.ok) {
      // Don't fail the poll loop on a transient read; report "not ready".
      return { ready: false, percent: 50 };
    }
    const { json } = await readBody(res);
    const body = (json ?? {}) as { status?: string };
    const ready = body.status === 'running' || body.status === 'ready';
    return { ready, percent: ready ? 90 : 50 };
  }

  async destroy(providerId: string): Promise<void> {
    const res = await orgoFetch(`/computers/${providerId}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 404) {
      throw new ProvisionerError(
        'orgo',
        'unknown',
        `orgo destroy returned ${res.status}`
      );
    }
  }
}

export const orgoProvisioner = new OrgoProvisioner();
