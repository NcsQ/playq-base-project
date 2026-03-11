"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Example: web.navigateByPath
 *
 * Purpose: Navigates to a relative path from the current origin/base URL.
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const base = 'https://letcode.in';
(0, test_1.test)('Navigate by relative path', async ({ page }) => {
    await core_1.web.openBrowser(page, base);
    await core_1.web.navigateByPath(page, '/forms', { screenshot: true, screenshotText: 'Navigated by path' });
    await core_1.web.waitForUrl(page, '/forms', { match: 'contains' });
    (0, test_1.expect)(page.url()).toContain('/forms');
});
