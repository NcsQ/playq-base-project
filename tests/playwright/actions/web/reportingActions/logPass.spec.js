"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.logPass
 *
 * Purpose: Log a passing step to the PlayQ report.
 * PatternIQ: Not applicable.
 * Steps:
 * - Call web.logPass with a message
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
(0, test_1.test)('Reporting: logPass attaches success message', async () => {
    await core_1.web.logPass('Step passed successfully');
});
