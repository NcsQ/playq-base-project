"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.takeScreenshot
 *
 * Purpose: Capture a screenshot of the current page.
 * Steps:
 * - Open page
 * - Call web.takeScreenshot (optional: full page, label)
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in';
(0, test_1.test)('Take a screenshot of page', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.takeScreenshot(page, { screenshotText: 'Page screenshot', screenshotFullPage: true });
});
