"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.fillAlert
 *
 * Purpose: Trigger a prompt alert and provide text input.
 * Page: LetCode → /alert
 * PatternIQ: Used to resolve the "Prompt Alert" button (pattern 'letcodesamples').
 * Steps:
 * - Open page
 * - In parallel: call web.fillAlert and click the "Prompt Alert" button
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/alert';
(0, test_1.test)('Fill a prompt alert', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    // Click the "Prompt Alert" button to trigger prompt dialog
    await Promise.all([
        core_1.web.fillAlert(page, 'PlayQ', { screenshot: false }),
        core_1.web.clickButton(page, 'Prompt Alert', { pattern: 'letcodesamples' }),
        core_1.comm.waitInMilliSeconds(5000)
    ]);
});
