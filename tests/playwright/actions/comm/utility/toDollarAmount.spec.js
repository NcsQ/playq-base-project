"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: comm.toDollarAmount
 *
 * Purpose: Format a value as $<amount>.00.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.toDollarAmount with various inputs
 * - Assert output is formatted correctly
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
(0, test_1.test)('Utility: toDollarAmount formats strings and numbers', async () => {
    (0, test_1.expect)(core_1.comm.toDollarAmount('USD 123.4')).toBe('$123.40');
    (0, test_1.expect)(core_1.comm.toDollarAmount(5)).toBe('$5.00');
    (0, test_1.expect)(core_1.comm.toDollarAmount('abc')).toBe('$0.00');
});
