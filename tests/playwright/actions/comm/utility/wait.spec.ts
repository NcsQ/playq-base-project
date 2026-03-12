/**
 * PlayQ Example: comm.wait (alias)
 *
 * Purpose: Wait alias wrapper for ms delay.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.wait with 100 ms
 */
import { test } from '@playwright/test';
import { comm, web } from '@playq/core';

const url = "https://letcode.in/radio";

test('Utility: wait pauses execution', async ({ page }) => {
  await web.openBrowser(page, url);
  await comm.wait(200);
  await web.clickCheckbox(page, "I agree", { pattern: "letcodesamples" });

});
