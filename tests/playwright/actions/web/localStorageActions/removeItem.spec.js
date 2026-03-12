"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.removeItem (localStorage)
 *
 * Purpose: Remove a key from window.localStorage.
 * Page: See 'url' constant.
 * PatternIQ: Not applicable.
 * Steps:
 * - Open page
 * - Remove key via web.removeItem
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/';
(0, test_1.test)('LocalStorage: removeItem deletes key', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.setItem(page, 'rm', '1');
    await core_1.web.removeItem(page, 'rm');
    const val = await core_1.web.getItem(page, 'rm');
    (0, test_1.expect)(val).toBeNull();
});
