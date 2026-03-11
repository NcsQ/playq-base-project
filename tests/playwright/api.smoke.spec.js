"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
// Single, focused API smoke test
test_1.test.describe('API Smoke', () => {
    (0, test_1.test)('API: GET/POST verification', async () => {
        await core_1.api.get('jsonplaceholder', 'todo1', 'https://jsonplaceholder.typicode.com');
        await core_1.api.assertPathValue('id', '1');
        const title = await core_1.api.getPathValueFromLastResponse('title');
        await core_1.comm.attachLog(`Title: ${title}`, 'text/plain', 'API');
        await core_1.api.post('httpbin', 'postEcho', 'https://httpbin.org');
        await core_1.api.assertPathValue('json.json.hello', 'world');
    });
});
