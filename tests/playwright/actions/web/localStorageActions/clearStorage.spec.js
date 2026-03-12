"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.clearStorage (localStorage)
 *
 * Purpose: Clear all keys from window.localStorage.
 * Page: See 'url' constant.
 * PatternIQ: Not applicable.
 * Steps:
 * - Open page
 * - Clear storage via web.clearStorage
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/';
(0, test_1.test)('LocalStorage: clearStorage wipes all keys', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.setItem(page, 'k1', 'v1');
    await core_1.web.setItem(page, 'k2', 'v2');
    await core_1.web.clearStorage(page);
    const v1 = await core_1.web.getItem(page, 'k1');
    const v2 = await core_1.web.getItem(page, 'k2');
    (0, test_1.expect)(v1).toBeNull();
    (0, test_1.expect)(v2).toBeNull();
});
