"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.executeScript
 *
 * Purpose: Demonstrates executing JavaScript in the page context
 *          and asserting on the returned value.
 * Page: The Internet (homepage)
 * PatternIQ: Not required for this example.
 * Steps:
 * - Open the page via web.openBrowser
 * - Call web.executeScript with a function accessing document.title
 * - Assert the returned string contains expected text
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/';
(0, test_1.test)('JavaScript: executeScript returns document.title', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    const title = await core_1.web.executeScript(page, () => document.title);
    (0, test_1.expect)(title).toContain('The Internet');
});
