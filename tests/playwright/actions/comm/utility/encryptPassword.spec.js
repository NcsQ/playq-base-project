"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: comm.encryptPassword
 *
 * Purpose: Encrypt a password and return with pwd. prefix.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.encryptPassword with a sample string
 * - Assert returned value starts with 'pwd.'
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
(0, test_1.test)('Utility: encryptPassword returns prefixed encrypted value', async () => {
    const out = await core_1.comm.encryptPassword('MySecret');
    (0, test_1.expect)(out.startsWith('pwd.')).toBeTruthy();
});
