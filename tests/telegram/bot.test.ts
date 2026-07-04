import { describe, it, expect, vi } from 'vitest';
import {
  isWellFormedToken,
  validateBotToken,
  setWebhook,
  buildRegisterChatWebhookUrl,
} from '../../src/lib/telegram-bot';

const GOOD_TOKEN = '1234567:AAEhBP0abcdefghijklmnopqrstuvwxyz123';

function jsonResponse(body: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    json: async () => body,
  } as unknown as Response;
}

describe('telegram-bot: isWellFormedToken', () => {
  it('accepts a real-shaped token', () => {
    expect(isWellFormedToken(GOOD_TOKEN)).toBe(true);
  });

  it('rejects empty / garbage / partial tokens', () => {
    expect(isWellFormedToken('')).toBe(false);
    expect(isWellFormedToken('not-a-token')).toBe(false);
    expect(isWellFormedToken('1234567:short')).toBe(false);
    expect(isWellFormedToken('abc:AAEhBP0abcdefghijklmnopqrstuvwxyz123')).toBe(false);
  });
});

describe('telegram-bot: validateBotToken', () => {
  it('returns ok + username on a valid token (getMe 200)', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse({ ok: true, result: { id: 1234567, username: 'my_appie_bot' } })
    );
    const res = await validateBotToken(GOOD_TOKEN, fetchImpl);
    expect(res).toEqual({ ok: true, username: 'my_appie_bot', botId: 1234567 });
    expect(fetchImpl).toHaveBeenCalledWith(
      `https://api.telegram.org/bot${GOOD_TOKEN}/getMe`,
      { method: 'GET' }
    );
  });

  it('strips a leading @ from the returned username', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse({ ok: true, result: { id: 1, username: '@x_bot' } })
    );
    const res = await validateBotToken(GOOD_TOKEN, fetchImpl);
    expect(res.ok && res.username).toBe('x_bot');
  });

  it('fails malformed BEFORE hitting the network', async () => {
    const fetchImpl = vi.fn();
    const res = await validateBotToken('garbage', fetchImpl);
    expect(res).toEqual({ ok: false, error: 'malformed' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('classifies a 401 as invalid-token', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({}, false, 401));
    const res = await validateBotToken(GOOD_TOKEN, fetchImpl);
    expect(res).toEqual({ ok: false, error: 'invalid-token' });
  });

  it('classifies a thrown fetch as network', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error('ECONNRESET'));
    const res = await validateBotToken(GOOD_TOKEN, fetchImpl);
    expect(res).toEqual({ ok: false, error: 'network' });
  });

  it('treats ok:false body as invalid-token', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({ ok: false }));
    const res = await validateBotToken(GOOD_TOKEN, fetchImpl);
    expect(res).toEqual({ ok: false, error: 'invalid-token' });
  });
});

describe('telegram-bot: setWebhook', () => {
  it('posts setWebhook with the register-chat url and message updates', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({ ok: true }));
    const url = buildRegisterChatWebhookUrl('https://dash.weblyfe.ai');
    const res = await setWebhook(GOOD_TOKEN, url, fetchImpl);
    expect(res).toEqual({ ok: true });
    const [calledUrl, init] = fetchImpl.mock.calls[0];
    expect(calledUrl).toBe(`https://api.telegram.org/bot${GOOD_TOKEN}/setWebhook`);
    const sentBody = JSON.parse((init as RequestInit).body as string);
    expect(sentBody.url).toBe('https://dash.weblyfe.ai/api/appie/register-chat');
    expect(sentBody.allowed_updates).toEqual(['message']);
  });

  it('returns failed when Telegram rejects', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({ ok: false }, false, 400));
    const res = await setWebhook(GOOD_TOKEN, 'https://x/y', fetchImpl);
    expect(res).toEqual({ ok: false, error: 'failed' });
  });

  it('returns network when fetch throws', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error('boom'));
    const res = await setWebhook(GOOD_TOKEN, 'https://x/y', fetchImpl);
    expect(res).toEqual({ ok: false, error: 'network' });
  });
});

describe('telegram-bot: buildRegisterChatWebhookUrl', () => {
  it('joins without a double slash', () => {
    expect(buildRegisterChatWebhookUrl('https://dash.weblyfe.ai/')).toBe(
      'https://dash.weblyfe.ai/api/appie/register-chat'
    );
    expect(buildRegisterChatWebhookUrl('https://dash.weblyfe.ai')).toBe(
      'https://dash.weblyfe.ai/api/appie/register-chat'
    );
  });
});
