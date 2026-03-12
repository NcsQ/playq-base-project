/**
 * PlayQ Example: comm.encryptText
 *
 * Purpose: Encrypt text and return with enc. prefix.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.encryptText with a sample string
 * - Assert returned value starts with 'enc.'
 */
import { test, expect } from '@playwright/test';
import { comm } from '@playq/core';

test('Utility: encryptText returns prefixed encrypted value', async () => {
  const out = await comm.encryptText('HelloWorld');
  expect(out.startsWith('enc.')).toBeTruthy();
});
