"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
// This suite exercises a broad set of actions across web, api, and comm
// using public test sites and local operations.
test_1.test.describe('Actions Smoke: Web/API/Comm', () => {
    (0, test_1.test)('WEB: Navigation + Validation + Forms + Mouse + Keyboard + Screenshots', async ({ page }) => {
        // Navigate and validate title
        await core_1.web.openBrowser(page, 'https://the-internet.herokuapp.com/');
        await core_1.web.verifyPageTitle(page, 'The Internet');
        // Basic link click and URL wait
        await core_1.web.clickLink(page, 'Form Authentication', { pattern: 'theinternet' });
        await core_1.web.waitForUrl(page, '/login');
        await core_1.web.openBrowser(page, 'https://the-internet.herokuapp.com/');
        // Dropdown interactions
        await core_1.web.navigateByPath(page, '/dropdown');
        await core_1.web.verifyHeaderText(page, 'Dropdown List', { pattern: 'theinternet' });
        await core_1.web.selectDropdown(page, 'select#dropdown', 'Option 2', { pattern: 'theinternet' });
        await core_1.web.verifySelectDropdownValue(page, 'select#dropdown', 'Option 2', { pattern: 'theinternet' });
        // Index 0 is a disabled placeholder; select a valid option index
        await core_1.web.selectDropdownByIndex(page, 'select#dropdown', 2, { pattern: 'theinternet' });
        await core_1.web.verifySelectListNotHaveGivenValue(page, 'select#dropdown', 'Nonexistent', { pattern: 'theinternet' });
        // Checkboxes
        await core_1.web.navigateByPath(page, '/checkboxes');
        await core_1.web.clickCheckbox(page, 'xpath=(//form[@id="checkboxes"]/input)[1]', { pattern: 'theinternet' });
        await core_1.web.waitForDisplayed(page, 'xpath=(//form[@id="checkboxes"]/input)[1]', { screenshot: false, pattern: 'theinternet' });
        // Buttons and flash notifications
        await core_1.web.navigateByPath(page, '/notification_message_rendered');
        await core_1.web.clickLink(page, 'Click here', { pattern: 'theinternet' });
        await core_1.web.verifyToastTextContains(page, 'Action', { pattern: 'theinternet' }); // message is randomized but contains "Action"
        // Inputs + keyboard + text verification
        await core_1.web.navigateByPath(page, '/inputs');
        // Use a direct CSS locator and bypass PatternIQ for this simple field
        await core_1.web.fill(page, 'css=input[type="number"]', '12345');
        await core_1.web.verifyInputFieldValue(page, 'css=input[type="number"]', '12345', { partialMatch: false });
        await core_1.web.pressTab(page);
        await core_1.web.pressKey(page, 'End');
        // Drag & Drop
        await core_1.web.navigateByPath(page, '/drag_and_drop');
        await core_1.web.dragAndDrop(page, '#column-a', '#column-b', { pattern: 'theinternet' });
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
        await core_1.web.openBrowser(page, 'https://the-internet.herokuapp.com/');
        await core_1.web.localStorageSet(page, 'sampleKey', 'sampleValue');
        const lsVal = await core_1.web.localStorageGet(page, 'sampleKey');
        (0, test_1.expect)(lsVal).toBe('sampleValue');
        await core_1.web.localStorageRemove(page, 'sampleKey');
        await core_1.web.localStorageClear(page);
        // Cookies
        await core_1.web.setCookie(page, 'playq_demo', 'yes');
        (0, test_1.expect)(await core_1.web.getCookie(page, 'playq_demo')).toBe('yes');
        await core_1.web.deleteCookie(page, 'playq_demo');
        await core_1.web.clearCookies(page);
        // Element readers + vars
        await core_1.web.navigateByPath(page, '/');
        // Bypass PatternIQ for simple header: use raw Playwright CSS
        await core_1.web.storeElementTextInVariable(page, 'css=h1', 'homeHeader');
        const hdr = core_1.vars.getValue('homeHeader');
        await core_1.comm.attachLog(`Captured header: ${hdr}`, 'text/plain', 'WEB');
        await core_1.web.verifyTextAtLocation(page, 'css=h1', hdr);
        // JavaScript execution
        const titleLen = await core_1.web.executeScript(page, () => document.title.length);
        (0, test_1.expect)(typeof titleLen).toBe('number');
        // Screenshots
        await core_1.web.takeScreenshot(page, { screenshot_text: 'After JS exec', screenshot_fullPage: false });
        await core_1.web.takeFullScreenshot(page, { screenshot_text: 'Full page' });
        // Waiting helpers
        await core_1.web.waitForHeader(page, 'css=h1', 'Welcome to the-internet');
        await core_1.web.waitForTextAtLocation(page, 'css=body', 'Available Examples', { partialMatch: true });
    });
    (0, test_1.test)('WEB: File Upload', async ({ page }) => {
        await core_1.web.openBrowser(page, 'https://the-internet.herokuapp.com/upload');
        // Use direct input locator to avoid any ambiguity
        await core_1.web.uploadFile(page, 'input#file-upload', 'lambdaTest.csv', { pattern: 'theinternet' });
        await core_1.web.clickButton(page, 'Upload', { pattern: 'theinternet' });
        await core_1.web.verifyTextOnPage(page, 'File Uploaded!');
    });
    (0, test_1.test)('API: GET/POST + Path validation', async () => {
        // Uses resources/api/*.api.ts configs (added for this smoke)
        await core_1.api.get('jsonplaceholder', 'todo1', 'https://jsonplaceholder.typicode.com');
        await core_1.api.assertPathValue('id', '1');
        const title = await core_1.api.getPathValueFromLastResponse('title');
        await core_1.comm.attachLog(`Title from API: ${title}`, 'text/plain', 'API');
        await core_1.api.post('httpbin', 'postEcho', 'https://httpbin.org');
        // httpbin echoes nested under json.json.hello based on our payload
        await core_1.api.assertPathValue('json.json.hello', 'world');
    });
    (0, test_1.test)('COMM: Utilities + waits + values', async () => {
        await core_1.comm.comment('Starting COMM utilities test');
        // storeValue(value, varName)
        await core_1.comm.storeValue('PlayQ', 'myVar');
        (0, test_1.expect)(core_1.vars.getValue('myVar')).toBe('PlayQ');
        const enc = await core_1.comm.encryptPassword('password123');
        await core_1.comm.attachLog(`Encrypted password: ${enc}`, 'text/plain', 'COMM');
        const dollars = await core_1.comm.toDollarAmount(1234.567);
        await core_1.comm.attachLog(`Formatted dollars: ${dollars}`, 'text/plain', 'COMM');
        // Sleep briefly
        await core_1.comm.waitInMilliSeconds(500);
        // Write a small JSON file under test-results
        const obj = { ts: Date.now(), ok: true };
        await core_1.comm.writeJsonToFile('test-results/comm-demo.json', obj);
    });
});
