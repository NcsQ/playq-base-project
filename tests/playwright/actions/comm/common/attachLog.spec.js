"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: comm.attachLog
 *
 * Purpose: Attaches a log message to the test context (Allure/Cucumber).
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.attachLog with message, mimeType, and label
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
(0, test_1.test)('Comm: attachLog adds an attachment to the report', async () => {
    await core_1.comm.attachLog('This is a demo attachment from comm.attachLog', 'text/plain', 'ExampleLog');
});
