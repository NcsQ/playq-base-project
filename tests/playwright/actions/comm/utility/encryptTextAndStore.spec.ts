/**
 * PlayQ Example: comm.encryptTextAndStore
 *
 * Purpose: Encrypt text and store the value in vars.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.encryptTextAndStore with a string and var name
 * - Assert vars.getValue(varName) starts with 'enc.'
 */
import { test, expect } from '@playwright/test';
import { comm, vars } from '@playq/core';

const varName = 'var.encText';

test('Utility: encryptTextAndStore saves encrypted text to vars', async () => {
  await comm.encryptTextAndStore('Sensitive', varName);
  const val = vars.getValue(varName);
  expect(typeof val === 'string' && val.startsWith('enc.')).toBeTruthy();
  console.log('Encrypted value stored in vars:', val);
});
