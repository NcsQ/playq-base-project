/**
 * PlayQ Example: api.verifyValue
 *
 * Purpose: Verify that an actual value matches expected.
 * Steps:
 * - Use verifyValue on a simple variable interpolation
 */
import { test } from '@playwright/test';
import { api, vars } from '@playq/core';

test('API: verifyValue asserts equality and attaches logs', async () => {
  vars.setValue('var.sample', 'Hello');
  await api.verifyValue('#{var.sample}', 'Hello', { assert: true });
});
