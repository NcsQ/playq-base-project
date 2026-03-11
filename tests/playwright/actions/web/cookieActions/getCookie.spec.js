"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Example: web.getCookie (cookieActions.getCookie)
 *
 * Purpose: Retrieves the value of a cookie by name.
 * Site: letcode.in (any page)
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/forms';
(0, test_1.test)('Get a cookie value', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await page.waitForLoadState('domcontentloaded');
    await core_1.web.setCookie(page, 'playq_token', 'xyz789', { domain: 'letcode.in', path: '/' });
    const val = await core_1.web.getCookie(page, 'playq_token', { assert: true });
    (0, test_1.expect)(val).toBe('xyz789');
});
