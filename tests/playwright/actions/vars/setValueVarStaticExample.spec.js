"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: vars.setValue with var.static. prefix
 *
 * Purpose: Demonstrate persisting a variable to var.static.json for future test runs.
 * Steps:
 * - Set a persistent variable using vars.setValue('var.static.myPersistentKey', 'persistentValue')
 * - Read it back using vars.getValue('var.static.myPersistentKey')
 * - Assert the value
 * - Check var.static.json after running this test to see the value persisted
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
(0, test_1.test)('Vars: setValue with var.static. persists to file', async () => {
    core_1.vars.setValue('var.static.myPersistentKey', 'persistentValue');
    const value = core_1.vars.getValue('var.static.myPersistentKey');
    (0, test_1.expect)(value).toBe('persistentValue');
});
