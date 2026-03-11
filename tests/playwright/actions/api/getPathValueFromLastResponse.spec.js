"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: api.getPathValueFromLastResponse
 *
 * Purpose: Extract a flexible path value (body/header/status/statusText).
 * Steps:
 * - Call GET
 * - Use helper to read 'title' and assert
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const baseUrl = 'https://jsonplaceholder.typicode.com';
(0, test_1.test)('API: getPathValueFromLastResponse reads body title', async () => {
    await core_1.api.get('jsonplaceholder', 'todo1', baseUrl);
    const title = await core_1.api.getPathValueFromLastResponse('title');
    (0, test_1.expect)(title).toBe('delectus aut autem');
});
