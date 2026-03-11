"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const baseUrl = 'https://jsonplaceholder.typicode.com';
(0, test_1.test)('Header validation example', async () => {
    await core_1.api.get('posts', 'getAll', baseUrl);
    await core_1.api.verifyHeader('content-type', 'application/json; charset=utf-8', { partial_text: true });
});
