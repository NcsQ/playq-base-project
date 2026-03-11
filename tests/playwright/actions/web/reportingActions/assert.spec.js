"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.assert
 *
 * Purpose: Log a pass/fail in reports based on a boolean condition.
 * PatternIQ: Not applicable.
 * Steps:
 * - Call web.assert with a true condition and message
 * - Verify test completes without errors (reporting only)
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
(0, test_1.test)('Reporting: assert logs pass when condition is true', async () => {
    await core_1.web.assert(true, 'Condition is true');
});
