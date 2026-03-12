"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.pressKey
 *
 * Purpose: Send a specific key press and validate the app’s response.
 * Page: See 'url' constant.
 * PatternIQ: Provide pattern and location when waiting for text updates.
 * Steps:
 * - Open page
 * - Call web.pressKey with the desired key
 * - Validate response via waitForTextAtLocation
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/edit';
(0, test_1.test)('Keyboard: pressKey TAB', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.type(page, 'Enter your full Name', 'John Doe', { pattern: 'letcodesamples' });
    await core_1.web.pressKey(page, 'Tab', { screenshot: false });
});
