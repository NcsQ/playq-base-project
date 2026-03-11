"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.setItem (localStorage)
 *
 * Purpose: Store a key/value pair in window.localStorage.
 * Page: See 'url' constant.
 * PatternIQ: Not applicable.
 * Steps:
 * - Open page
 * - Set a key/value via web.setItem
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/';
(0, test_1.test)('LocalStorage: setItem stores value', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.setItem(page, 'foo', 'bar');
    const val = await core_1.web.getItem(page, 'foo');
    (0, test_1.expect)(val).toBe('bar');
});
