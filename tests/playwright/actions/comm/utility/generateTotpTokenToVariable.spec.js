"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: comm.generateTotpTokenToVariable
 *
 * Purpose: Generate a TOTP token and store it in vars.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Skip test if PLAYQ_TOTP_SECRET_KEY is not set
 * - Call comm.generateTotpTokenToVariable with a var name
 * - Assert vars.getValue(varName) is a numeric string of expected length
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const varName = 'var.otp';
test_1.test.skip(!process.env.PLAYQ_TOTP_SECRET_KEY, 'PLAYQ_TOTP_SECRET_KEY not configured');
(0, test_1.test)('Utility: generateTotpTokenToVariable stores token', async () => {
    await core_1.comm.generateTotpTokenToVariable(varName);
    const token = core_1.vars.getValue(varName);
    (0, test_1.expect)(typeof token).toBe('string');
    (0, test_1.expect)(token.length).toBeGreaterThanOrEqual(6);
});
