"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.seeAlertText
 *
 * Purpose: Verify alert text using partial and/or case-insensitive matching.
 * Page: LetCode → /alert
 * PatternIQ: Used to resolve the triggering button (pattern 'letcodesamples').
 * Steps:
 * - Open page
 * - In parallel: call web.seeAlertText and click the alert-triggering button
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/alert';
(0, test_1.test)('Verify alert text', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    // Click the "Simple Alert" button to trigger alert
    await Promise.all([
        // LetCode simple alert text: "Hey! Welcome to LetCode" → verify partial
        core_1.web.seeAlertText(page, 'Welcome to LetCode', { partialMatch: true, ignoreCase: true, assert: true, screenshot: false }),
        core_1.web.clickButton(page, 'Simple Alert', { pattern: 'letcodesamples' })
    ]);
});
