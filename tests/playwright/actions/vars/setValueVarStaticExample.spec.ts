/**
 * PlayQ Example: vars.setValue with var.static. prefix
 *
 * Purpose: Demonstrate persisting a variable to var.static.json for future test runs.
 * Steps:
 * - Set a persistent variable using vars.setValue('var.static.myPersistentKey', 'persistentValue')
 * - Read it back using vars.getValue('var.static.myPersistentKey')
 * - Assert the value
 * - Check var.static.json after running this test to see the value persisted
 */
import { test, expect } from '@playwright/test';
import { vars } from '@playq/core';

test('Vars: setValue with var.static. persists to file', async () => {
  vars.setValue('var.static.myPersistentKey', 'persistentValue');
  const value = vars.getValue('var.static.myPersistentKey');
  expect(value).toBe('persistentValue');
});
