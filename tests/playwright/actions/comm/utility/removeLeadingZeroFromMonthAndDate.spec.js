"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: comm.removeLeadingZeroFromMonthAndDate
 *
 * Purpose: Remove leading zeros from DD/MM/YYYY date.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.removeLeadingZeroFromMonthAndDate on a date string
 * - Assert the returned string has no leading zeros
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
(0, test_1.test)('Utility: removeLeadingZeroFromMonthAndDate formats date', async () => {
    const out = await core_1.comm.removeLeadingZeroFromMonthAndDate('03/07/2025');
    (0, test_1.expect)(out).toBe('3/7/2025');
});
