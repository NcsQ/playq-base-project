"use strict";
/**
 * PlayQ Example: web.waitForInputState
 *
 * Purpose: Wait for an input or button to reach a desired state (enabled/disabled).
 * Page: See 'url' constant.
 * PatternIQ: Provide { pattern, fieldType } to resolve element by name.
 * Steps:
 * - Open page
 * - Wait for element state
 */
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/edit';
(0, test_1.test)('Wait for Full Name input enabled', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.waitForInputState(page, 'Enter your full Name', 'enabled', { pattern: 'letcodesamples' });
});
(0, test_1.test)('Wait for No Edit input disabled', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.waitForInputState(page, 'Confirm edit field is disabled', 'disabled', { pattern: 'letcodesamples' });
});
