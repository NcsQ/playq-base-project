"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: api.getLastResponseJsonPathValue
 *
 * Purpose: Extract a value from last response JSON via path.
 * Steps:
 * - Call GET
 * - Extract title using JSON path utility
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const baseUrl = 'https://jsonplaceholder.typicode.com';
(0, test_1.test)('API: getLastResponseJsonPathValue extracts title', async () => {
    await core_1.api.get('jsonplaceholder', 'todo1', baseUrl);
    const title = await core_1.api.getLastResponseJsonPathValue('x.title');
    (0, test_1.expect)(title).toBe('delectus aut autem');
});
