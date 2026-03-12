"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Example: web.takeFullScreenshot
 *
 * Purpose: Captures a full-page screenshot using defaults.
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in';
(0, test_1.test)('Take full page screenshot', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.takeFullScreenshot(page, { screenshotText: 'Full page' });
});
