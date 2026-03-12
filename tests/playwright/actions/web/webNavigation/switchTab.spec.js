"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.switchTab
 *
 * Purpose: Switch to another browser tab/window.
 * Steps:
 * - Ensure a second tab is opened
 * - Call web.switchTab to focus the target tab
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const base = 'https://letcode.in';
(0, test_1.test)('Switch between tabs', async ({ page }) => {
    // Keep first tab on /forms
    await core_1.web.openBrowser(page, base + '/forms');
    // Open second tab on /radio within the same context
    const second = await core_1.web.openNewTab(page, base + '/radio');
    // Bring first tab to front (index 0) and assert its URL
    await core_1.web.switchTab(page, 0);
    await core_1.web.waitForUrl(page, '/forms', { match: 'contains' });
    (0, test_1.expect)(page.url()).toContain('/forms');
    // Bring second tab to front (index 1); assert using 'second' page instance
    await core_1.web.switchTab(page, 1);
    await core_1.web.waitForUrl(second, '/radio', { match: 'contains' });
    (0, test_1.expect)(second.url()).toContain('/radio');
});
