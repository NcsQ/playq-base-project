"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.scrollTo
 *
 * Purpose: Scroll the page until a target element is in view.
 * Page: See 'url' constant.
 * PatternIQ: Provide { pattern, fieldType } if resolving a named element.
 * Steps:
 * - Open page
 * - Resolve target element
 * - Scroll into view
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/';
(0, test_1.test)('Mouse: scrollTo specific Y', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.scrollTo(page, 0, 800);
});
