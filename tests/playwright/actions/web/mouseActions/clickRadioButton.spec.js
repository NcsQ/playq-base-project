"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.clickRadioButton
 *
 * Purpose: Select a radio option via associated label or value.
 * Page: See 'url' constant.
 * PatternIQ: Provide { pattern, fieldType: 'radio' } to resolve radios.
 * Steps:
 * - Open page
 * - Resolve radio by label/value
 * - Click the radio
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/radio';
(0, test_1.test)('Mouse: clickRadioButton Going', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.clickRadioButton(page, 'Going', { pattern: 'letcodesamples' });
});
