"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: comm.wait (alias)
 *
 * Purpose: Wait alias wrapper for ms delay.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.wait with 100 ms
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = "https://letcode.in/radio";
(0, test_1.test)('Utility: wait pauses execution', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.comm.wait(200);
    await core_1.web.clickCheckbox(page, "I agree", { pattern: "letcodesamples" });
});
