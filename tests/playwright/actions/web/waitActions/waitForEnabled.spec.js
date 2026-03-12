"use strict";
/**
 * PlayQ Example: web.waitForEnabled
 *
 * Purpose: Wait until a target element becomes enabled.
 * Page: See 'url' constant.
 * PatternIQ: Provide { pattern, fieldType } to resolve element by name.
 * Steps:
 * - Open page
 * - Wait for enabled state
 */
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/waits';
(0, test_1.test)('Wait for "Simple Alert" button to be enabled', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    const locator = await (0, core_1.webLocResolver)('button', 'Simple Alert', page, 'letcodesamples', 5000);
    await core_1.web.waitForEnabled(locator, 5000);
});
