"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.clickButton
 *
 * Purpose: Click a button by label using PatternIQ or locator.
 * Page: See 'url' constant.
 * PatternIQ: Provide { pattern, fieldType: 'button' } to resolve by text.
 * Steps:
 * - Open page
 * - Resolve button by label
 * - Click the button
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/dynamic_controls';
(0, test_1.test)('Mouse: clickButton on Remove', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.clickButton(page, 'Remove', { pattern: 'theinternet' });
});
