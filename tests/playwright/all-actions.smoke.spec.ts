import { test, expect } from '@playwright/test';
import { web, api, comm, vars, faker } from '@playq/core';

// This suite exercises a broad set of actions across web, api, and comm
// using public test sites and local operations.

test.describe('Actions Smoke: Web/API/Comm', () => {
  test('WEB: Navigation + Validation + Forms + Mouse + Keyboard + Screenshots', async ({ page }) => {
    // Navigate and validate title
    await web.openBrowser(page, 'https://the-internet.herokuapp.com/');
    await web.verifyPageTitle(page, 'The Internet');

    // Basic link click and URL wait
    await web.clickLink(page, 'Form Authentication', { pattern: 'theinternet' });
    await web.waitForUrl(page, '/login');
    await web.openBrowser(page, 'https://the-internet.herokuapp.com/');

    // Dropdown interactions
    await web.navigateByPath(page, '/dropdown');
    await web.verifyHeaderText(page, 'Dropdown List', { pattern: 'theinternet' });
    await web.selectDropdown(page, 'select#dropdown', 'Option 2', { pattern: 'theinternet' });
    await web.verifySelectDropdownValue(page, 'select#dropdown', 'Option 2', { pattern: 'theinternet' });
    // Index 0 is a disabled placeholder; select a valid option index
    await web.selectDropdownByIndex(page, 'select#dropdown', 2, { pattern: 'theinternet' });
    await web.verifySelectListNotHaveGivenValue(page, 'select#dropdown', 'Nonexistent', { pattern: 'theinternet' });

    // Checkboxes
    await web.navigateByPath(page, '/checkboxes');
    await web.clickCheckbox(page, 'xpath=(//form[@id="checkboxes"]/input)[1]', { pattern: 'theinternet' });
    await web.waitForDisplayed(page, 'xpath=(//form[@id="checkboxes"]/input)[1]', { screenshot: false, pattern: 'theinternet' });

    // Buttons and flash notifications
    await web.navigateByPath(page, '/notification_message_rendered');
    await web.clickLink(page, 'Click here', { pattern: 'theinternet' });
    await web.verifyToastTextContains(page, 'Action', { pattern: 'theinternet' }); // message is randomized but contains "Action"

    // Inputs + keyboard + text verification
    await web.navigateByPath(page, '/inputs');
    // Use a direct CSS locator and bypass PatternIQ for this simple field
    await web.fill(page, 'css=input[type="number"]', '12345');
    await web.verifyInputFieldValue(page, 'css=input[type="number"]', '12345', { partialMatch: false });
    await web.pressTab(page);
    await web.pressKey(page, 'End');

    // Drag & Drop
    await web.navigateByPath(page, '/drag_and_drop');
    await web.dragAndDrop(page, '#column-a', '#column-b', { pattern: 'theinternet' });

    // Iframe interactions (commented out per request)
    // await web.navigateByPath(page, '/iframe');
    // const frame = await web.switchToFrame(page, 'iframe', { pattern: 'theinternet' });
    // // Detect TinyMCE read-only banner and log; do not attempt edits
    // try {
    //   const bodyText = await frame.locator('body').innerText();
    //   if (bodyText.includes('TinyMCE is in read-only mode')) {
    //     await comm.attachLog('TinyMCE read-only banner present; skipping editor interactions.', 'text/plain', 'WEB');
    //   }
    // } catch {}
    // // Return to main content
    // await web.switchToMainContent(page);

    // LocalStorage
    await web.openBrowser(page, 'https://the-internet.herokuapp.com/');
    await web.localStorageSet(page, 'sampleKey', 'sampleValue');
    const lsVal = await web.localStorageGet(page, 'sampleKey');
    expect(lsVal).toBe('sampleValue');
    await web.localStorageRemove(page, 'sampleKey');
    await web.localStorageClear(page);

    // Cookies
    await web.setCookie(page, 'playq_demo', 'yes');
    expect(await web.getCookie(page, 'playq_demo')).toBe('yes');
    await web.deleteCookie(page, 'playq_demo');
    await web.clearCookies(page);

    // Element readers + vars
    await web.navigateByPath(page, '/');
    // Bypass PatternIQ for simple header: use raw Playwright CSS
    await web.storeElementTextInVariable(page, 'css=h1', 'homeHeader');
    const hdr = vars.getValue('homeHeader');
    await comm.attachLog(`Captured header: ${hdr}`, 'text/plain', 'WEB');
    await web.verifyTextAtLocation(page, 'css=h1', hdr);

    // JavaScript execution
    const titleLen = await web.executeScript(page, () => document.title.length);
    expect(typeof titleLen).toBe('number');

    // Screenshots
    await web.takeScreenshot(page, { screenshot_text: 'After JS exec', screenshot_fullPage: false });
    await web.takeFullScreenshot(page, { screenshot_text: 'Full page' });

    // Waiting helpers
    await web.waitForHeader(page, 'css=h1', 'Welcome to the-internet');
    await web.waitForTextAtLocation(page, 'css=body', 'Available Examples', { partialMatch: true });
  });

  test('WEB: File Upload', async ({ page }) => {
    await web.openBrowser(page, 'https://the-internet.herokuapp.com/upload');
    // Use direct input locator to avoid any ambiguity
    await web.uploadFile(page, 'input#file-upload', 'lambdaTest.csv', { pattern: 'theinternet' });
    await web.clickButton(page, 'Upload', { pattern: 'theinternet' });
    await web.verifyTextOnPage(page, 'File Uploaded!');
  });

  test('API: GET/POST + Path validation', async () => {
    // Uses resources/api/*.api.ts configs (added for this smoke)
    await api.get('jsonplaceholder', 'todo1', 'https://jsonplaceholder.typicode.com');
    await api.assertPathValue('id', '1');
    const title = await api.getPathValueFromLastResponse('title');
    await comm.attachLog(`Title from API: ${title}`, 'text/plain', 'API');

    await api.post('httpbin', 'postEcho', 'https://httpbin.org');
    // httpbin echoes nested under json.json.hello based on our payload
    await api.assertPathValue('json.json.hello', 'world');
  });

  test('COMM: Utilities + waits + values', async () => {
    await comm.comment('Starting COMM utilities test');
    // storeValue(value, varName)
    await comm.storeValue('PlayQ', 'myVar');
    expect(vars.getValue('myVar')).toBe('PlayQ');

    const enc = await comm.encryptPassword('password123');
    await comm.attachLog(`Encrypted password: ${enc}`, 'text/plain', 'COMM');

    const dollars = await comm.toDollarAmount(1234.567);
    await comm.attachLog(`Formatted dollars: ${dollars}`, 'text/plain', 'COMM');

    // Sleep briefly
    await comm.waitInMilliSeconds(500);

    // Write a small JSON file under test-results
    const obj = { ts: Date.now(), ok: true };
    await comm.writeJsonToFile('test-results/comm-demo.json', obj);
  });
});
