"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.waitForDisappear
 *
 * Purpose: Wait until an element disappears from the page.
 * Page: See 'url' constant.
 * PatternIQ: Provide { pattern, fieldType } when resolving named elements.
 * Steps:
 * - Open page
 * - Trigger element to disappear
 * - Wait for disappearance
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/dynamic_controls';
(0, test_1.test)('Wait for checkbox to disappear', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    // Click Remove button
    await core_1.web.clickButton(page, 'Remove', { type: 'button', pattern: 'theinternet' });
    // Wait for checkbox to disappear
    await core_1.web.waitForDisappear(page, 'Remove', {
        fieldType: 'button',
        pattern: 'theinternet',
        actionTimeout: 15000
    });
});
