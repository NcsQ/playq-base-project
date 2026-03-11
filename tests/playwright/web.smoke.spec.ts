import { test } from '@playwright/test';
import { web } from '@playq/core';

// Single, focused Web smoke test

test.describe('Web Smoke', () => {
  test('WEB: Basic Navigation', async ({ page }) => {
    await web.openBrowser(page, 'https://the-internet.herokuapp.com/');
    await web.verifyPageTitle(page, 'The Internet');
    await web.clickLink(page, 'Form Authentication', { pattern: 'theinternet' });
    await web.waitForUrl(page, '/login');
    await web.takeScreenshot(page, { screenshot_text: 'On Login page' });
  });
});
