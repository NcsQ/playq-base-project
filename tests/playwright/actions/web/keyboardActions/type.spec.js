"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.type
 *
 * Purpose: Type into an input using PatternIQ-resolved locator or raw selector.
 * Page: See 'url' constant.
 * PatternIQ: Provide { pattern, fieldType: 'input' } to resolve inputs.
 * Steps:
 * - Open page
 * - Resolve input field
 * - Type text and verify
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/edit';
(0, test_1.test)('Keyboard: type into Full Name', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.type(page, 'Enter your full Name', 'John Doe', { pattern: 'letcodesamples' });
});
