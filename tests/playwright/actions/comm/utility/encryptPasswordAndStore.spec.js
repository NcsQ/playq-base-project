"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: comm.encryptPasswordAndStore
 *
 * Purpose: Encrypt a password and store the value in vars.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.encryptPasswordAndStore with a string and var name
 * - Assert vars.getValue(varName) starts with 'pwd.'
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const varName = 'var.encPwd';
(0, test_1.test)('Utility: encryptPasswordAndStore saves encrypted pwd to vars', async () => {
    await core_1.comm.encryptPasswordAndStore('TopSecret', varName);
    const val = core_1.vars.getValue(varName);
    (0, test_1.expect)(typeof val === 'string' && val.startsWith('pwd.')).toBeTruthy();
});
