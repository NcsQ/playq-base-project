"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Example: web.processScreenshot
 *
 * Purpose: Processes screenshot capture with custom text and options.
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in';
(0, test_1.test)('Process screenshot manually', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.processScreenshot(page, true, 'Manual screenshot after load', true);
});
