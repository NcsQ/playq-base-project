"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: validation.seePageTitle
 *
 * Purpose: Confirm page title contains/equals expected text.
 * Steps:
 * - Navigate
 * - Check page title
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in';
(0, test_1.test)('See page title contains LetCode with Koushik', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.seePageTitle(page, 'LetCode with Koushik', { screenshot: false });
});
