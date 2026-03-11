"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.dismissAlert
 *
 * Purpose: Trigger a confirm alert and dismiss it.
 * Page: LetCode → /alert
 * PatternIQ: Used to resolve the "Confirm Alert" button (pattern 'letcodesamples').
 * Steps:
 * - Open page
 * - In parallel: call web.dismissAlert and click the "Confirm Alert" button
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/alert';
(0, test_1.test)('Dismiss a confirm alert', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    // Click the "Confirm Alert" button to trigger confirm dialog
    await Promise.all([
        core_1.web.dismissAlert(page, { screenshot: false }),
        core_1.web.clickButton(page, 'Confirm Alert', { pattern: 'letcodesamples' })
    ]);
});
