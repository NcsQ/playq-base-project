"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: comm.comment
 *
 * Purpose: Demonstrates adding a comment to the test log via framework.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.comment with a message
 * - Verify no error occurs
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
(0, test_1.test)('Comm: comment logs a message', async () => {
    await core_1.comm.comment('Example comment: Comm action demonstration');
});
