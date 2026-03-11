"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Example: web.deleteCookie (cookieActions.deleteCookie)
 *
 * Purpose: Clears cookies in context (Playwright clears all; name used for reporting only).
 * Site: letcode.in (any page)
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/forms';
(0, test_1.test)('Delete cookie (clears all in context)', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await page.waitForLoadState('domcontentloaded');
    await core_1.web.setCookie(page, 'playq_token', 'del123', { domain: 'letcode.in', path: '/' });
    await core_1.web.deleteCookie(page, 'playq_token');
    const val = await core_1.web.getCookie(page, 'playq_token', { assert: false });
    (0, test_1.expect)(val).toBeUndefined();
});
