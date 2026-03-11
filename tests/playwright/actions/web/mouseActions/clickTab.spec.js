"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.clickTab
 *
 * Purpose: Click a navigation tab in the site header using PatternIQ.
 * Page: LetCode → /test
 * PatternIQ: pattern 'letcodesamples', fieldType 'tab'
 * Steps:
 * - Open the LetCode test page
 * - Resolve the "Courses" tab via PatternIQ
 * - Click the tab; screenshots optional
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/test';
(0, test_1.test)('Click Courses tab', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.clickTab(page, 'Courses', {
        pattern: 'letcodesamples',
        screenshot: false
    });
});
