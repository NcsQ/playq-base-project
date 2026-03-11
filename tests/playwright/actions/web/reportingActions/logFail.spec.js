"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.logFail
 *
 * Purpose: Log a failing step to the PlayQ report.
 * PatternIQ: Not applicable.
 * Steps:
 * - Call web.logFail with a message
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
(0, test_1.test)('Reporting: logFail attaches failure message', async () => {
    await core_1.web.logFail('A recoverable failure was logged');
});
