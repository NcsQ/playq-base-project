"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.switchToMainContent
 *
 * Purpose: Switch back to the main document after working inside an iframe.
 * Page: The Internet → /iframe
 * PatternIQ: pattern 'theinternet', fieldType 'iframe' (id 'mce_0_ifr')
 * Steps:
 * - Open page and switch into iframe via PatternIQ
 * - Evaluate in frame and verify content is present
 * - Call web.switchToMainContent to return to main frame
 * - Verify main page heading
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/iframe';
(0, test_1.test)('IFrame: switch back to main content', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    const frame = await core_1.web.switchToFrame(page, 'mce_0_ifr', { pattern: 'theinternet', fieldType: 'frames' });
    const frameText = await frame.evaluate(() => document.body.innerText || '');
    (0, test_1.expect)(frameText.length).toBeGreaterThan(0);
    await core_1.web.switchToMainContent(page);
    const heading = await core_1.web.executeScript(page, () => { var _a; return ((_a = document.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent) || ''; });
    (0, test_1.expect)(heading).toContain('An iFrame containing');
});
