"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: comm.storeValue
 *
 * Purpose: Stores a value in the runtime variable store.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.storeValue with a value and var name
 * - Read back via vars.getValue and assert
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const varName = 'var.example.greeting';
(0, test_1.test)('Comm: storeValue saves value to vars', async () => {
    await core_1.comm.storeValue('Hello', varName);
    const stored = core_1.vars.getValue(varName);
    (0, test_1.expect)(stored).toBe('Hello');
});
