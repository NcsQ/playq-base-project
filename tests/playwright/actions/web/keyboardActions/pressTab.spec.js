"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.pressTab
 *
 * Purpose: Send a Tab key press to move focus and validate behavior.
 * Page: See 'url' constant.
 * PatternIQ: Provide pattern and location when verifying changes.
 * Steps:
 * - Open page
 * - Call web.pressTab
 * - Verify focus or text change
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/edit';
(0, test_1.test)('Keyboard: pressTab', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.type(page, 'Enter your full Name', 'John Doe', { pattern: 'letcodesamples' });
    await core_1.web.pressTab(page, { screenshot: false });
});
