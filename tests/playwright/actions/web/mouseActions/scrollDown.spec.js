"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.scrollDown
 *
 * Purpose: Scroll downward on the page to reveal content.
 * Page: See 'url' constant.
 * PatternIQ: Not required.
 * Steps:
 * - Open page
 * - Call scrollDown
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/';
(0, test_1.test)('Mouse: scrollDown by 400px', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.scrollDown(page, 400);
});
