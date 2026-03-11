"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
// Single, focused Web smoke test
test_1.test.describe('Web Smoke', () => {
    (0, test_1.test)('WEB: Basic Navigation', async ({ page }) => {
        await core_1.web.openBrowser(page, 'https://the-internet.herokuapp.com/');
        await core_1.web.verifyPageTitle(page, 'The Internet');
        await core_1.web.clickLink(page, 'Form Authentication', { pattern: 'theinternet' });
        await core_1.web.waitForUrl(page, '/login');
        await core_1.web.takeScreenshot(page, { screenshot_text: 'On Login page' });
    });
});
