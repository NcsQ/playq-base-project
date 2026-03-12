/**
 * PlayQ Example: comm.storeValue
 *
 * Purpose: Stores a value in the runtime variable store.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.storeValue with a value and var name
 * - Read back via vars.getValue and assert
 */
import { test, expect } from '@playwright/test';
import { comm, vars } from '@playq/core';

const varName = 'var.example.greeting';

test('Comm: storeValue saves value to vars', async () => {
  await comm.storeValue('Hello', varName);
  const stored = vars.getValue(varName);
  expect(stored).toBe('Hello');
});
