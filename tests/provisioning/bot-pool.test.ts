import { describe, it, expect } from 'vitest';
import { parsePool, leaseBot } from '../../src/lib/provisioning/bot-pool';
import { ProvisionerError } from '../../src/lib/provisioning/types';

describe('bot-pool', () => {
  it('parses token-only entries and derives a username', () => {
    const pool = parsePool('111:AAA,222:BBB');
    expect(pool).toEqual([
      { token: '111:AAA', username: 'appie_111_bot' },
      { token: '222:BBB', username: 'appie_222_bot' },
    ]);
  });

  it('parses username:token entries', () => {
    const pool = parsePool('@eva_bot:111:AAA');
    expect(pool).toEqual([{ token: '111:AAA', username: 'eva_bot' }]);
  });

  it('leases the first un-leased bot', () => {
    const bot = leaseBot('111:AAA,222:BBB', new Set(['111:AAA']));
    expect(bot.token).toBe('222:BBB');
  });

  it('throws when the pool is empty', () => {
    expect(() => leaseBot('', new Set())).toThrow(ProvisionerError);
  });

  it('throws when the pool is exhausted', () => {
    expect(() => leaseBot('111:AAA', new Set(['111:AAA']))).toThrow(ProvisionerError);
  });
});
