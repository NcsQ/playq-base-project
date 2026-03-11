"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const baseUrl = 'https://jsonplaceholder.typicode.com';
(0, test_1.test)('POST example', async () => {
    await core_1.api.post('posts', 'create', baseUrl, { body: { title: 'foo', body: 'bar', userId: 1 } });
    await core_1.api.verifyStatus(201);
    await core_1.api.verifyPathValue('id', '101');
});
