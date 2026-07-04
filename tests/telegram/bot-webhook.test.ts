import { describe, it, expect, vi, beforeEach } from 'vitest';

// Unified per-appie bot webhook. We mock the DB, secretbox decrypt, the sender,
// and the model call so we test the routing/isolation/security logic in
// isolation: bind vs onboarding-reply vs voice, UUID guard, per-tenant scoping.

const APPIE_ID = '33333333-3333-4333-8333-333333333333';
const OTHER_APPIE = '44444444-4444-4444-8444-444444444444';

const dbQuery = vi.fn();
vi.mock('../../src/lib/db', () => ({
  withUserScope: async (_userId: unknown, fn: (client: unknown) => unknown) =>
    fn({ query: dbQuery }),
}));

const consumeBindToken = vi.fn();
vi.mock('../../src/lib/telegram-bind', () => ({
  consumeBindToken: (...a: unknown[]) => consumeBindToken(...a),
}));

vi.mock('../../src/lib/secretbox', () => ({
  decryptFromBuffers: () => '1234567:AAdecryptedbottoken',
}));

const sendCustomerMessage = vi.fn();
vi.mock('../../src/lib/telegram', () => ({
  sendCustomerMessage: (...a: unknown[]) => sendCustomerMessage(...a),
}));

const generateOnboardingReply = vi.fn();
vi.mock('../../src/lib/onboarding-chat', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    generateOnboardingReply: (...a: unknown[]) => generateOnboardingReply(...a),
  };
});

import { POST } from '../../src/app/api/appie/bot/webhook/[appieId]/route';

function req(body: unknown): Request {
  return new Request('http://localhost/api/appie/bot/webhook/x', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}
function params(appieId: string) {
  return { params: Promise.resolve({ appieId }) };
}

beforeEach(() => {
  dbQuery.mockReset();
  consumeBindToken.mockReset();
  sendCustomerMessage.mockReset();
  generateOnboardingReply.mockReset();
  process.env.OPENROUTER_API_KEY = 'sk-test';
});

describe('bot webhook: guards', () => {
  it('400 on non-UUID appie id', async () => {
    const res = await POST(req({ message: { chat: { id: 1 }, text: 'hi' } }) as never, params('not-a-uuid'));
    expect(res.status).toBe(400);
  });

  it('400 on invalid JSON body', async () => {
    const bad = new Request('http://localhost/x', { method: 'POST', body: '{' });
    const res = await POST(bad as never, params(APPIE_ID));
    expect(res.status).toBe(400);
  });

  it('200 + no-op on update without a chat id', async () => {
    const res = await POST(req({ edited_message: {} }) as never, params(APPIE_ID));
    expect(res.status).toBe(200);
    expect(sendCustomerMessage).not.toHaveBeenCalled();
  });
});

describe('bot webhook: /start bind', () => {
  it('binds only when the token belongs to THIS appie', async () => {
    consumeBindToken.mockResolvedValue({ appieId: APPIE_ID });
    dbQuery.mockResolvedValue({ rowCount: 1, rows: [] });
    const res = await POST(
      req({ message: { chat: { id: 999 }, text: '/start tok_abc' } }) as never,
      params(APPIE_ID)
    );
    expect(res.status).toBe(200);
    // UPDATE appies SET telegram_chat_id was called.
    const upd = dbQuery.mock.calls.find((c) => /telegram_chat_id/.test(c[0]));
    expect(upd).toBeTruthy();
    expect(upd![1]).toEqual([APPIE_ID, '999']);
  });

  it('does NOT bind when token belongs to a different appie (isolation)', async () => {
    consumeBindToken.mockResolvedValue({ appieId: OTHER_APPIE });
    const res = await POST(
      req({ message: { chat: { id: 999 }, text: '/start tok_xyz' } }) as never,
      params(APPIE_ID)
    );
    expect(res.status).toBe(200);
    const upd = dbQuery.mock.calls.find((c) => /telegram_chat_id/.test(c[0]));
    expect(upd).toBeFalsy();
  });
});

describe('bot webhook: onboarding reply', () => {
  it('loads token, calls model, sends reply, persists history', async () => {
    generateOnboardingReply.mockResolvedValue({ ok: true, reply: 'Hoi! Ik help je.' });
    dbQuery
      .mockResolvedValueOnce({
        rowCount: 1,
        rows: [
          {
            telegram_bot_token_enc: Buffer.from('x'),
            telegram_bot_token_nonce: Buffer.from('y'),
            onboarding_state: { name: 'Sam', voiceLanguage: 'nl', chatHistory: [] },
          },
        ],
      }) // SELECT token + state
      .mockResolvedValueOnce({ rowCount: 1, rows: [] }); // UPDATE onboarding_state

    const res = await POST(
      req({ message: { chat: { id: 555 }, text: 'kun je me helpen' } }) as never,
      params(APPIE_ID)
    );
    expect(res.status).toBe(200);
    expect(generateOnboardingReply).toHaveBeenCalledOnce();
    expect(sendCustomerMessage).toHaveBeenCalledWith(
      '1234567:AAdecryptedbottoken',
      '555',
      'Hoi! Ik help je.'
    );
    // History persisted with both turns.
    const updCall = dbQuery.mock.calls.find((c) => /UPDATE appies SET onboarding_state/.test(c[0]));
    expect(updCall).toBeTruthy();
    const saved = JSON.parse(updCall![1][1]);
    expect(saved.chatHistory).toHaveLength(2);
    expect(saved.chatHistory[1].role).toBe('assistant');
  });

  it('sends a graceful fallback when the model fails, without persisting history', async () => {
    generateOnboardingReply.mockResolvedValue({ ok: false, error: 'network' });
    dbQuery.mockResolvedValueOnce({
      rowCount: 1,
      rows: [
        {
          telegram_bot_token_enc: Buffer.from('x'),
          telegram_bot_token_nonce: Buffer.from('y'),
          onboarding_state: { voiceLanguage: 'nl' },
        },
      ],
    });
    const res = await POST(
      req({ message: { chat: { id: 1 }, text: 'hoi' } }) as never,
      params(APPIE_ID)
    );
    expect(res.status).toBe(200);
    expect(sendCustomerMessage).toHaveBeenCalledOnce();
    const updCall = dbQuery.mock.calls.find((c) => /UPDATE appies SET onboarding_state/.test(c[0]));
    expect(updCall).toBeFalsy();
  });

  it('no-ops when the appie has no bot token', async () => {
    dbQuery.mockResolvedValueOnce({ rowCount: 1, rows: [{ telegram_bot_token_enc: null, telegram_bot_token_nonce: null, onboarding_state: {} }] });
    const res = await POST(
      req({ message: { chat: { id: 1 }, text: 'hi' } }) as never,
      params(APPIE_ID)
    );
    expect(res.status).toBe(200);
    expect(sendCustomerMessage).not.toHaveBeenCalled();
  });
});

describe('bot webhook: voice', () => {
  it('replies with the text-first fallback and never calls the model', async () => {
    dbQuery.mockResolvedValue({
      rowCount: 1,
      rows: [{ telegram_bot_token_enc: Buffer.from('x'), telegram_bot_token_nonce: Buffer.from('y') }],
    });
    const res = await POST(
      req({ message: { chat: { id: 7 }, voice: { file_id: 'v1' }, from: { language_code: 'nl' } } }) as never,
      params(APPIE_ID)
    );
    expect(res.status).toBe(200);
    expect(generateOnboardingReply).not.toHaveBeenCalled();
    expect(sendCustomerMessage).toHaveBeenCalledOnce();
  });
});

describe('bot webhook: rate limit', () => {
  it('stops sending after the per-appie cap', async () => {
    generateOnboardingReply.mockResolvedValue({ ok: false, error: 'network' });
    dbQuery.mockResolvedValue({
      rowCount: 1,
      rows: [{ telegram_bot_token_enc: Buffer.from('x'), telegram_bot_token_nonce: Buffer.from('y'), onboarding_state: {} }],
    });
    const rlAppie = '55555555-5555-4555-8555-555555555555';
    let sent = 0;
    for (let i = 0; i < 30; i++) {
      sendCustomerMessage.mockClear();
      await POST(req({ message: { chat: { id: 1 }, text: `m${i}` } }) as never, params(rlAppie));
      if (sendCustomerMessage.mock.calls.length > 0) sent++;
    }
    // Cap is 20/min; should send at most 20, not all 30.
    expect(sent).toBeLessThanOrEqual(20);
    expect(sent).toBeGreaterThan(0);
  });
});
