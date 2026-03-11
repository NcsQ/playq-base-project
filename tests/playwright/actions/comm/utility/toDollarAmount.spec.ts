/**
 * PlayQ Example: comm.toDollarAmount
 *
 * Purpose: Format a value as $<amount>.00.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.toDollarAmount with various inputs
 * - Assert output is formatted correctly
 */
import { test, expect } from '@playwright/test';
import { comm } from '@playq/core';

test('Utility: toDollarAmount formats strings and numbers', async () => {
  expect(comm.toDollarAmount('USD 123.4')).toBe('$123.40');
  expect(comm.toDollarAmount(5)).toBe('$5.00');
  expect(comm.toDollarAmount('abc')).toBe('$0.00');
});
