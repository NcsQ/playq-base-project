/**
 * PlayQ Example: comm.encryptPassword
 *
 * Purpose: Encrypt a password and return with pwd. prefix.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.encryptPassword with a sample string
 * - Assert returned value starts with 'pwd.'
 */
import { test, expect } from '@playwright/test';
import { comm } from '@playq/core';

test('Utility: encryptPassword returns prefixed encrypted value', async () => {
  const out = await comm.encryptPassword('MySecret');
  expect(out.startsWith('pwd.')).toBeTruthy();
});
