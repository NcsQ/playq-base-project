"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.waitForUrl
 *
 * Purpose: Wait until the current page URL matches expected value/pattern.
 * PatternIQ: Not applicable.
 * Steps:
 * - Open page or navigate
 * - Wait for URL
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const base = 'https://letcode.in';
(0, test_1.test)('Wait for URL to contain /waits', async ({ page }) => {
    await core_1.web.openBrowser(page, base + '/waits');
    await core_1.web.waitForUrl(page, '/waits', { match: 'contains' });
    (0, test_1.expect)(page.url()).toContain('/waits');
});
