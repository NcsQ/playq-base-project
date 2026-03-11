"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: validation.verifyHeaderText
 *
 * Purpose: Validate a header element’s text content.
 * PatternIQ: Provide { pattern, fieldType: 'header' } when resolving headings.
 * Steps:
 * - Navigate
 * - Validate header text matches expectation
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/';
(0, test_1.test)('Verify header text equals Welcome to the-internet', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.verifyHeaderText(page, 'Welcome to the-internet', { pattern: 'theinternet', partialMatch: false, screenshot: false });
});
