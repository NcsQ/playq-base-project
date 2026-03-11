"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.waitForDisplayed
 *
 * Purpose: Wait until a target element is displayed/visible.
 * Page: See 'url' constant.
 * PatternIQ: Provide { pattern, fieldType } to resolve element by name.
 * Steps:
 * - Open page
 * - Wait for displayed state
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/waits';
(0, test_1.test)('Wait for "Simple Alert" button to be displayed', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.waitForDisplayed(page, 'Simple Alert', { fieldType: 'button', pattern: 'letcodesamples', screenshot: false });
});
