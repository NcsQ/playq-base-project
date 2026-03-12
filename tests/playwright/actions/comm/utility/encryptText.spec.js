"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: comm.encryptText
 *
 * Purpose: Encrypt text and return with enc. prefix.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.encryptText with a sample string
 * - Assert returned value starts with 'enc.'
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
(0, test_1.test)('Utility: encryptText returns prefixed encrypted value', async () => {
    const out = await core_1.comm.encryptText('HelloWorld');
    (0, test_1.expect)(out.startsWith('enc.')).toBeTruthy();
});
