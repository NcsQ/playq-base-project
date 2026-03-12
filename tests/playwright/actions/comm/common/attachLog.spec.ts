/**
 * PlayQ Example: comm.attachLog
 *
 * Purpose: Attaches a log message to the test context (Allure/Cucumber).
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.attachLog with message, mimeType, and label
 */
import { test } from '@playwright/test';
import { comm } from '@playq/core';

test('Comm: attachLog adds an attachment to the report', async () => {
  await comm.attachLog('This is a demo attachment from comm.attachLog', 'text/plain', 'ExampleLog');
});
