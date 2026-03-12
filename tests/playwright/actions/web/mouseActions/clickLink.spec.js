"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.clickLink
 *
 * Purpose: Click a hyperlink resolved via PatternIQ or raw locator.
 * Page: See 'url' constant.
 * PatternIQ: Provide { pattern, fieldType: 'link' } when using named links.
 * Steps:
 * - Open page
 * - Resolve link by text or locator
 * - Click the link
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/';
(0, test_1.test)('Mouse: clickLink A/B Testing navigates', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.clickLink(page, 'A/B Testing', { pattern: 'theinternet' });
    await core_1.web.waitForUrl(page, '/abtest', { match: 'contains' });
    (0, test_1.expect)(page.url()).toContain('/abtest');
});
