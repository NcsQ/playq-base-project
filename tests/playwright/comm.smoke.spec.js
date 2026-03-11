"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
// Single, focused Comm smoke test
test_1.test.describe('Comm Smoke', () => {
    (0, test_1.test)('COMM: Store + Wait + Log', async () => {
        await core_1.comm.comment('Starting COMM smoke');
        await core_1.comm.storeValue('PlayQ', 'myVar');
        (0, test_1.expect)(core_1.vars.getValue('myVar')).toBe('PlayQ');
        await core_1.comm.waitInMilliSeconds(200);
        await core_1.comm.attachLog('COMM smoke done', 'text/plain', 'COMM');
    });
});
