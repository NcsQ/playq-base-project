/**
 * PlayQ Example: comm.waitInMilliSeconds
 *
 * Purpose: Pauses execution for the specified milliseconds.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.waitInMilliSeconds with 200 ms
 */
import { test } from '@playwright/test';
import { comm, web } from '@playq/core';

const url = "https://letcode.in/radio";

test('Comm: waitInMilliSeconds pauses execution', async ({ page }) => {
  await web.openBrowser(page, url);
  await comm.waitInMilliSeconds(200);
  await web.clickCheckbox(page, "I agree", { pattern: "letcodesamples" });
});
