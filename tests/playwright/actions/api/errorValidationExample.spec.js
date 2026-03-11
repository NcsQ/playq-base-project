"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const baseUrl = 'https://jsonplaceholder.typicode.com';
(0, test_1.test)('Negative/error validation example', async () => {
    await core_1.api.get('posts', 'notFound', baseUrl);
    await core_1.api.verifyError(404);
});
