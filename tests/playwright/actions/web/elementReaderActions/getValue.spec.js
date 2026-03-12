"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Example: web.getValue
 *
 * Purpose: Reads the current input value of an element.
 * Site: letcode.in/elements
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/elements';
(0, test_1.test)('Read value from username input after fill', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.fill(page, 'username', 'octocat', { fieldType: 'input', pattern: 'letcodesamples' });
    const value = await core_1.web.getValue(page, 'username', { fieldType: 'input', pattern: 'letcodesamples' });
    (0, test_1.expect)(value).toBe('octocat');
});
