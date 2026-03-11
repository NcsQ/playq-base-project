"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.switchToFrame
 *
 * Purpose: Switch to an iframe using PatternIQ and interact within the frame.
 * Page: The Internet → /iframe
 * PatternIQ: pattern 'theinternet', fieldType 'iframe' (id 'mce_0_ifr')
 * Steps:
 * - Open page with web.openBrowser
 * - Resolve iframe via web.switchToFrame using PatternIQ
 * - Evaluate in frame context and verify content
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/iframe';
(0, test_1.test)('IFrame: switchToFrame and read content', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    const frame = await core_1.web.switchToFrame(page, 'mce_0_ifr', { pattern: 'theinternet', fieldType: 'frames' });
    const setResult = await frame.evaluate(() => {
        const body = document.body;
        const prev = body.innerText || '';
        body.innerText = 'Hello from frame';
        return prev.length >= 0;
    });
    (0, test_1.expect)(setResult).toBeTruthy();
    const text = await frame.evaluate(() => document.body.innerText);
    (0, test_1.expect)(text).toContain('Hello from frame');
});
