"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.refreshPage
 *
 * Purpose: Refresh the current page.
 * Steps:
 * - Navigate to a page
 * - Call web.refreshPage
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/forms';
(0, test_1.test)('Refresh page resets input value', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.fill(page, 'First Name', 'Temp', { fieldType: 'input', pattern: 'letcodesamples' });
    await core_1.web.refreshPage(page, { screenshot: false });
    await core_1.web.waitForPageToLoad(page);
    const value = await core_1.web.getValue(page, 'First Name', { fieldType: 'input', pattern: 'letcodesamples' });
    (0, test_1.expect)(value).toBe('');
});
