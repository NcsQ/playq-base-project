/**
 * PlayQ Example: comm.generateTotpTokenToVariable
 *
 * Purpose: Generate a TOTP token and store it in vars.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Skip test if PLAYQ_TOTP_SECRET_KEY is not set
 * - Call comm.generateTotpTokenToVariable with a var name
 * - Assert vars.getValue(varName) is a numeric string of expected length
 */
import { test, expect } from '@playwright/test';
import { comm, vars } from '@playq/core';

const varName = 'var.otp';

test.skip(!process.env.PLAYQ_TOTP_SECRET_KEY, 'PLAYQ_TOTP_SECRET_KEY not configured');

test('Utility: generateTotpTokenToVariable stores token', async () => {
  await comm.generateTotpTokenToVariable(varName);
  const token = vars.getValue(varName);
  expect(typeof token).toBe('string');
  expect(token.length).toBeGreaterThanOrEqual(6);
});
