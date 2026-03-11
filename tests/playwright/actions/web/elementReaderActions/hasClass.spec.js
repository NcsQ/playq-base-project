"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Example: web.hasClass
 *
 * Purpose: Checks whether an element contains a CSS class.
 * Site: letcode.in/elements
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/elements';
(0, test_1.test)('Check class on username input', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    const has = await core_1.web.hasClass(page, 'username', 'input', { fieldType: 'input', pattern: 'letcodesamples' });
    (0, test_1.expect)(has).toBe(true);
});
