"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.getText
 *
 * Purpose: Read the inner text of an element.
 * Page: LetCode → /elements
 * PatternIQ: Provide { pattern, fieldType } to resolve targets.
 * Steps:
 * - Open page
 * - Resolve element (e.g., button)
 * - Read text and assert
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/elements';
(0, test_1.test)('Read text from Search button', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    const text = await core_1.web.getText(page, 'Search', { fieldType: 'button', pattern: 'letcodesamples' });
    (0, test_1.expect)(text.trim()).toBe('Search');
});
