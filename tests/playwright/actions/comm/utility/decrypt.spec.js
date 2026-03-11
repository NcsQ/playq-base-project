"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: comm.decrypt
 *
 * Purpose: Decrypt encrypted data and store plain text in vars.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Encrypt text via comm.encryptText to get 'enc.<data>'
 * - Strip prefix and pass raw data to comm.decrypt
 * - Assert vars.getValue(varName) equals original text
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const varName = 'var.decrypted';
(0, test_1.test)('Utility: decrypt stores decrypted value in vars', async () => {
    const enc = await core_1.comm.encryptText('Hello');
    const raw = enc.startsWith('enc.') ? enc.substring(4) : enc;
    await core_1.comm.decrypt(raw, varName);
    const val = core_1.vars.getValue(varName);
    (0, test_1.expect)(val).toBe('Hello');
    console.log('Decrypted value stored in vars:', val);
});
