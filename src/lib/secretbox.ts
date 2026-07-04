// libsodium secretbox-equivalent using tweetnacl (XSalsa20-Poly1305).
// Used to encrypt Telegram bot tokens, OAuth refresh tokens at rest.
// Per PRD section 18-item checklist item 11: encrypted at app layer, key from env.

import nacl from 'tweetnacl';

function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) throw new Error('Invalid hex string');
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

function getKey(keyHex?: string): Uint8Array {
  const hex =
    keyHex ??
    process.env.SECRETBOX_KEY ??
    (process.env.NODE_ENV === 'test'
      ? '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
      : '');
  if (!hex || hex.length !== 64) {
    throw new Error('SECRETBOX_KEY must be a 32-byte hex string (64 chars)');
  }
  return hexToBytes(hex);
}

export type EncryptedPayload = {
  ciphertext: Uint8Array;
  nonce: Uint8Array;
};

export function encrypt(plaintext: string, keyHex?: string): EncryptedPayload {
  const key = getKey(keyHex);
  const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
  const messageBytes = new TextEncoder().encode(plaintext);
  const ciphertext = nacl.secretbox(messageBytes, nonce, key);
  return { ciphertext, nonce };
}

export function decrypt(payload: EncryptedPayload, keyHex?: string): string {
  const key = getKey(keyHex);
  const messageBytes = nacl.secretbox.open(payload.ciphertext, payload.nonce, key);
  if (!messageBytes) {
    throw new Error('Decryption failed: ciphertext tampered or wrong key');
  }
  return new TextDecoder().decode(messageBytes);
}

// Convenience helpers for storing as Buffer (Postgres BYTEA)
export function encryptToBuffers(plaintext: string, keyHex?: string): {
  ciphertext: Buffer;
  nonce: Buffer;
} {
  const { ciphertext, nonce } = encrypt(plaintext, keyHex);
  return { ciphertext: Buffer.from(ciphertext), nonce: Buffer.from(nonce) };
}

export function decryptFromBuffers(
  ciphertext: Buffer | Uint8Array,
  nonce: Buffer | Uint8Array,
  keyHex?: string
): string {
  return decrypt(
    {
      ciphertext: ciphertext instanceof Uint8Array ? ciphertext : new Uint8Array(ciphertext),
      nonce: nonce instanceof Uint8Array ? nonce : new Uint8Array(nonce),
    },
    keyHex
  );
}
