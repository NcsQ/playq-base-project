"use strict";
/**
 * PlayQ Example: web.waitForCondition
 *
 * Purpose: Wait until a custom condition function evaluates to true.
 * PatternIQ: Not applicable.
 * Steps:
 * - Open page or set up context
 * - Provide a condition function
 * - Wait for condition to pass
 */
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/waits';
(0, test_1.test)('Wait for condition: URL contains /waits', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.waitForCondition(page, async (p) => p.url().includes('/waits'));
    (0, test_1.expect)(page.url()).toContain('/waits');
    await core_1.web.waitForHeader(page, 'Wait', 'Wait');
});
