"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.pressEnter
 *
 * Purpose: Send an Enter key press and validate the app’s response.
 * Page: The Internet → /key_presses
 * PatternIQ: Used by waitForTextAtLocation to resolve 'result' via pattern 'theinternet'.
 * Steps:
 * - Open page
 * - Call web.pressEnter
 * - Wait for exact text at the 'result' location via PatternIQ
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/key_presses';
(0, test_1.test)('Keyboard: pressEnter', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.pressEnter(page, { screenshot: false });
    await core_1.web.waitForTextAtLocation(page, 'result', 'You entered: ENTER', { pattern: 'theinternet', partialMatch: false, actionTimeout: 5000 });
});
