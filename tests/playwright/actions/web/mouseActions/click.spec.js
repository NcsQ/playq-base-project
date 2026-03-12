"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.click
 *
 * Purpose: Click any element resolved via PatternIQ or raw locator.
 * Page: See 'url' constant.
 * PatternIQ: Use appropriate fieldType (e.g., 'link', 'button', 'input').
 * Steps:
 * - Open page
 * - Resolve element
 * - Click the element
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/dynamic_controls';
(0, test_1.test)('Mouse: click alias works on Remove', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.click(page, 'Remove', { pattern: 'theinternet' });
});
