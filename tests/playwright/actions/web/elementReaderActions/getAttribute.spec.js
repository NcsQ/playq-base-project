"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Example: web.getAttribute
 *
 * Purpose: Reads a specific attribute from an element.
 * Site: letcode.in/elements
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/elements';
(0, test_1.test)('Read placeholder attribute from username input', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    const placeholder = await core_1.web.getAttribute(page, 'username', 'placeholder', { fieldType: 'input', pattern: 'letcodesamples' });
    (0, test_1.expect)(placeholder).toBe('Enter your git user name eg., ortonikc');
});
