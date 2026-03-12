"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.acceptAlert
 *
 * Purpose: Trigger a native alert and accept it.
 * Page: LetCode → /alert
 * PatternIQ: Used to resolve the "Simple Alert" button (pattern 'letcodesamples').
 * Steps:
 * - Open page
 * - In parallel: call web.acceptAlert and click the "Simple Alert" button
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/alert';
(0, test_1.test)('Accept a simple alert', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    // Click the "Simple Alert" button to trigger native alert
    await Promise.all([
        core_1.web.acceptAlert(page, { screenshot: false }),
        core_1.web.clickButton(page, 'Simple Alert', { pattern: 'letcodesamples' }),
    ]);
    // web.click      
    // web.clickButtonAndAcceptAlert(page, 'Simple Alert', { pattern: 'letcodesamples' }),
});
