"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.getItem (localStorage)
 *
 * Purpose: Retrieve a value previously set in window.localStorage.
 * Page: The Internet (homepage)
 * PatternIQ: Not applicable.
 * Steps:
 * - Open page
 * - Set a key/value via web.setItem
 * - Retrieve value via web.getItem with assert
 * - Verify the returned value
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/';
(0, test_1.test)('LocalStorage: getItem retrieves value', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.setItem(page, 'alpha', 'beta');
    const val = await core_1.web.getItem(page, 'alpha', { assert: true });
    (0, test_1.expect)(val).toBe('beta');
});
