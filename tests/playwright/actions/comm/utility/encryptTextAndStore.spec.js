"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: comm.encryptTextAndStore
 *
 * Purpose: Encrypt text and store the value in vars.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.encryptTextAndStore with a string and var name
 * - Assert vars.getValue(varName) starts with 'enc.'
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const varName = 'var.encText';
(0, test_1.test)('Utility: encryptTextAndStore saves encrypted text to vars', async () => {
    await core_1.comm.encryptTextAndStore('Sensitive', varName);
    const val = core_1.vars.getValue(varName);
    (0, test_1.expect)(typeof val === 'string' && val.startsWith('enc.')).toBeTruthy();
    console.log('Encrypted value stored in vars:', val);
});
