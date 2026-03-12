"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.mouseoverOnLink
 *
 * Purpose: Hover over a link resolved via PatternIQ or locator.
 * Page: See 'url' constant.
 * PatternIQ: Provide { pattern, fieldType: 'link' } when hovering by text.
 * Steps:
 * - Open page
 * - Resolve link
 * - Mouse over
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/';
(0, test_1.test)('Mouse: mouseover on footer link', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.mouseoverOnLink(page, 'Elemental Selenium', { pattern: 'theinternet', screenshot: false });
});
