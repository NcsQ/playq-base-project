"use strict";
/**
 * PlayQ Example: validation.verifyTextOnPage
 *
 * Purpose: Validate that specific text appears on the page.
 * PatternIQ: Provide pattern/location when resolving named areas.
 * Steps:
 * - Navigate
 * - Validate presence of expected text
 */
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/dynamic_content';
(0, test_1.test)('Verify text on page: demonstrates ', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.verifyTextOnPage(page, 'demonstrates', { pattern: 'theinternet', partialMatch: false, screenshot: false });
});
