"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: comm.waitInMilliSeconds
 *
 * Purpose: Pauses execution for the specified milliseconds.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.waitInMilliSeconds with 200 ms
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = "https://letcode.in/radio";
(0, test_1.test)('Comm: waitInMilliSeconds pauses execution', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.comm.waitInMilliSeconds(200);
    await core_1.web.clickCheckbox(page, "I agree", { pattern: "letcodesamples" });
});
