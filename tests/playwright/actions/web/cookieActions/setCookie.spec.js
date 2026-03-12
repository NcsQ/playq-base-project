"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.setCookie
 *
 * Purpose: Add a cookie for the current page origin.
 * Page: LetCode (any page)
 * PatternIQ: Not applicable.
 * Steps:
 * - Open page
 * - Set cookie via web.setCookie
 * - Optionally read back via web.getCookie and assert
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/forms';
(0, test_1.test)('Set a cookie for the current origin', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await page.waitForLoadState('domcontentloaded');
    await core_1.web.setCookie(page, 'playq_token', 'abc123', { domain: 'letcode.in', path: '/', secure: false, httpOnly: false });
    const val = await core_1.web.getCookie(page, 'playq_token', { assert: true });
    (0, test_1.expect)(val).toBe('abc123');
});
