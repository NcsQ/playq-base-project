/**
 * PlayQ Example: comm.getRandomFromList
 *
 * Purpose: Select a random item from a list.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.getRandomFromList on a small array
 * - Assert the returned value is one of the items
 */
import { test, expect } from '@playwright/test';
import { comm } from '@playq/core';

const items = ['red', 'green', 'blue'];

test('Utility: getRandomFromList returns an item from the list', async () => {
  const chosen = await comm.getRandomFromList(items);
  expect(items).toContain(chosen);
  console.log('Randomly chosen item:', chosen);
});
