"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: api.verifyValue
 *
 * Purpose: Verify that an actual value matches expected.
 * Steps:
 * - Use verifyValue on a simple variable interpolation
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
(0, test_1.test)('API: verifyValue asserts equality and attaches logs', async () => {
    core_1.vars.setValue('var.sample', 'Hello');
    await core_1.api.verifyValue('#{var.sample}', 'Hello', { assert: true });
});
