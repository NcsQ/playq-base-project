"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.openBrowser
 *
 * Purpose: Navigate to a URL and initialize the page context.
 * Steps:
 * - Call web.openBrowser with page and url
 * - Proceed with actions/assertions
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/forms';
(0, test_1.test)('Open browser to forms page', async ({ page }) => {
    await core_1.web.openBrowser(page, url, { screenshot: true, screenshotText: 'Opened LetCode forms' });
    await core_1.web.waitForUrl(page, '/forms', { match: 'contains' });
    (0, test_1.expect)(page.url()).toContain('/forms');
});
