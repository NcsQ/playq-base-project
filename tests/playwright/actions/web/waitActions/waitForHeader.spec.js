"use strict";
/**
 * PlayQ Example: web.waitForHeader
 *
 * Purpose: Wait for a page header to match expected text.
 * Page: See 'url' constant.
 * PatternIQ: Provide { pattern, fieldType: 'header' } to resolve heading.
 * Steps:
 * - Open page
 * - Wait for header text
 */
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/waits';
(0, test_1.test)('Wait for H1 header text', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.waitForHeader(page, 'Wait', 'Wait', { partialMatch: false, screenshot: false });
});
