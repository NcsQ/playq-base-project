"use strict";
/**
 * PlayQ Example: web.waitForPageToLoad
 *
 * Purpose: Wait for the page to finish loading.
 * PatternIQ: Not applicable.
 * Steps:
 * - Open page
 * - Wait for load state and key selectors
 */
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/waits';
(0, test_1.test)('Wait for page to load after navigation', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.waitForPageToLoad(page);
    await core_1.web.waitForHeader(page, 'Wait', 'Wait');
});
