/**
 * PlayQ Example: comm.encryptPasswordAndStore
 *
 * Purpose: Encrypt a password and store the value in vars.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.encryptPasswordAndStore with a string and var name
 * - Assert vars.getValue(varName) starts with 'pwd.'
 */
import { test, expect } from '@playwright/test';
import { comm, vars } from '@playq/core';

const varName = 'var.encPwd';

test('Utility: encryptPasswordAndStore saves encrypted pwd to vars', async () => {
  await comm.encryptPasswordAndStore('TopSecret', varName);
  const val = vars.getValue(varName);
  expect(typeof val === 'string' && val.startsWith('pwd.')).toBeTruthy();
});
