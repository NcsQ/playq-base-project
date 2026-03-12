"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const baseUrl = 'https://jsonplaceholder.typicode.com';
(0, test_1.test)('PATCH example', async () => {
    await core_1.api.patch('posts', 'patch', baseUrl, { body: { title: 'patched' } });
    await core_1.api.verifyStatus(200);
});
