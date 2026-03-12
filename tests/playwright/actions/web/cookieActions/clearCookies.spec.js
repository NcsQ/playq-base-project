"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Example: web.clearCookies (cookieActions.clearCookies)
 *
 * Purpose: Clears all cookies in the current browser context.
 * Site: letcode.in (any page)
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/forms';
(0, test_1.test)('Clear all cookies in context', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await page.waitForLoadState('domcontentloaded');
    await core_1.web.setCookie(page, 'cookie_one', 'one', { domain: 'letcode.in', path: '/' });
    await core_1.web.setCookie(page, 'cookie_two', 'two', { domain: 'letcode.in', path: '/' });
    await core_1.web.clearCookies(page);
    const v1 = await core_1.web.getCookie(page, 'cookie_one', { assert: false });
    const v2 = await core_1.web.getCookie(page, 'cookie_two', { assert: false });
    (0, test_1.expect)(v1).toBeUndefined();
    (0, test_1.expect)(v2).toBeUndefined();
});
