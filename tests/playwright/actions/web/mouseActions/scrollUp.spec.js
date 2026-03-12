"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.scrollUp
 *
 * Purpose: Scroll upward on the page to improve visibility of elements.
 * Page: See 'url' constant.
 * PatternIQ: Not required.
 * Steps:
 * - Open page
 * - Call scrollUp
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/';
(0, test_1.test)('Mouse: scrollUp by 300px', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.scrollDown(page, 600);
    await core_1.web.scrollUp(page, 300);
});
