"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Example: web.closeTab
 *
 * Purpose: Closes the current tab and verifies it is closed.
 * Site: letcode.in
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in';
(0, test_1.test)('Close current tab', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.closeTab(page, { screenshot: false });
    (0, test_1.expect)(page.isClosed()).toBeTruthy();
});
