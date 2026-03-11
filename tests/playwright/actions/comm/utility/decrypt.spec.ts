/**
 * PlayQ Example: comm.decrypt
 *
 * Purpose: Decrypt encrypted data and store plain text in vars.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Encrypt text via comm.encryptText to get 'enc.<data>'
 * - Strip prefix and pass raw data to comm.decrypt
 * - Assert vars.getValue(varName) equals original text
 */
import { test, expect } from '@playwright/test';
import { comm, vars } from '@playq/core';

const varName = 'var.decrypted';

test('Utility: decrypt stores decrypted value in vars', async () => {
  const enc = await comm.encryptText('Hello');
  const raw = enc.startsWith('enc.') ? enc.substring(4) : enc;
  await comm.decrypt(raw, varName);
  const val = vars.getValue(varName);
  expect(val).toBe('Hello');
  console.log('Decrypted value stored in vars:', val);
});
