"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.clickCheckbox
 *
 * Purpose: Toggle a checkbox via label association or direct locator.
 * Page: See 'url' constant.
 * PatternIQ: Provide { pattern, fieldType: 'checkbox' } to resolve by label.
 * Steps:
 * - Open page
 * - Resolve checkbox by label or locator
 * - Click to toggle
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/forms';
(0, test_1.test)('Mouse: clickCheckbox ', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.clickCheckbox(page, 'I agree to the terms and conditions', { pattern: 'letcodesamples' });
});
