/**
 * PlayQ Example: comm.removeLeadingZeroFromMonthAndDate
 *
 * Purpose: Remove leading zeros from DD/MM/YYYY date.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.removeLeadingZeroFromMonthAndDate on a date string
 * - Assert the returned string has no leading zeros
 */
import { test, expect } from '@playwright/test';
import { comm } from '@playq/core';

test('Utility: removeLeadingZeroFromMonthAndDate formats date', async () => {
  const out = await comm.removeLeadingZeroFromMonthAndDate('03/07/2025');
  expect(out).toBe('3/7/2025');
});
