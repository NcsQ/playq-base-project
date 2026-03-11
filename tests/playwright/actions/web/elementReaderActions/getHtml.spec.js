"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Example: web.getHtml
 *
 * Purpose: Reads the inner HTML of an element.
 * Site: letcode.in/elements
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/elements';
(0, test_1.test)('Read inner HTML from Search button', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    const html = await core_1.web.getHtml(page, 'Search', { fieldType: 'button', pattern: 'letcodesamples' });
    (0, test_1.expect)(typeof html).toBe('string');
    (0, test_1.expect)(html.length).toBeGreaterThan(0);
    (0, test_1.expect)(html).toContain('Search');
});
