"use strict";
/**
 * PlayQ Example: validation.verifyPageTitle
 *
 * Purpose: Validate the current page title string.
 * Steps:
 * - Navigate
 * - Verify page title matches expectation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/';
(0, test_1.test)('Verify exact page title', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    // Exact page title for the-internet.herokuapp.com
    await core_1.web.verifyPageTitle(page, 'The Internet', {
        pattern: 'theinternet',
        screenshot: false
    });
});
