/**
 * PlayQ Example: comm.comment
 *
 * Purpose: Demonstrates adding a comment to the test log via framework.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.comment with a message
 * - Verify no error occurs
 */
import { test } from '@playwright/test';
import { comm } from '@playq/core';

test('Comm: comment logs a message', async () => {
  await comm.comment('Example comment: Comm action demonstration');
});
