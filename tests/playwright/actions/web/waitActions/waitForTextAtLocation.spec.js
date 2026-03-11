"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.waitForTextAtLocation
 *
 * Purpose: Wait for text at a named location or locator to match expectations.
 * Page: See 'url' constant.
 * PatternIQ: Provide { pattern } to resolve named locations.
 * Steps:
 * - Open page
 * - Wait for text at location (exact/partial)
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/waits';
(0, test_1.test)('Wait for label text at location', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.waitForTextAtLocation(page, 'Accept the Alert', 'Accept the Alert', { pattern: 'letcodesamples', partialMatch: false, actionTimeout: 5000 });
});
