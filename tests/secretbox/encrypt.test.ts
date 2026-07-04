import { describe, it, expect } from 'vitest';
import { encrypt, decrypt, encryptToBuffers, decryptFromBuffers } from '../../src/lib/secretbox';

const KEY = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

describe('secretbox', () => {
  it('encrypts and decrypts a roundtrip', () => {
    const plaintext = 'super-secret-telegram-bot-token';
    const enc = encrypt(plaintext, KEY);
    expect(enc.ciphertext.length).toBeGreaterThan(0);
    expect(enc.nonce.length).toBe(24);
    const out = decrypt(enc, KEY);
    expect(out).toBe(plaintext);
  });

  it('detects ciphertext tampering', () => {
    const enc = encrypt('hello', KEY);
    const tampered = new Uint8Array(enc.ciphertext);
    tampered[0] ^= 1;
    expect(() => decrypt({ ciphertext: tampered, nonce: enc.nonce }, KEY)).toThrow(/tampered/);
  });

  it('detects nonce tampering', () => {
    const enc = encrypt('hello', KEY);
    const tamperedNonce = new Uint8Array(enc.nonce);
    tamperedNonce[0] ^= 1;
    expect(() =>
      decrypt({ ciphertext: enc.ciphertext, nonce: tamperedNonce }, KEY)
    ).toThrow(/tampered/);
  });

  it('rejects wrong key', () => {
    const enc = encrypt('hello', KEY);
    const wrongKey = '0000000000000000000000000000000000000000000000000000000000000000';
    expect(() => decrypt(enc, wrongKey)).toThrow(/tampered/);
  });

  it('rejects malformed key length', () => {
    expect(() => encrypt('x', 'tooshort')).toThrow(/32-byte hex/);
  });

  it('roundtrips through Buffer helpers', () => {
    const { ciphertext, nonce } = encryptToBuffers('hello', KEY);
    expect(Buffer.isBuffer(ciphertext)).toBe(true);
    expect(Buffer.isBuffer(nonce)).toBe(true);
    expect(decryptFromBuffers(ciphertext, nonce, KEY)).toBe('hello');
  });
});
