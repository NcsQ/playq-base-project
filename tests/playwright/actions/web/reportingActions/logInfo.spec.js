"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.logInfo
 *
 * Purpose: Add an informational line to the PlayQ report.
 * PatternIQ: Not applicable.
 * Steps:
 * - Call web.logInfo with a message
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
(0, test_1.test)('Reporting: logInfo attaches message', async () => {
    await core_1.web.logInfo('This is an info log from reportingActions');
});
