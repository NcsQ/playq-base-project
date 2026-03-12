"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const baseUrl = 'https://jsonplaceholder.typicode.com';
(0, test_1.test)('Schema validation example', async () => {
    await core_1.api.get('posts', 'getAll', baseUrl);
    const schema = {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                userId: { type: 'number' },
                id: { type: 'number' },
                title: { type: 'string' },
                body: { type: 'string' }
            },
            required: ['userId', 'id', 'title', 'body']
        }
    };
    await core_1.api.verifySchema(schema);
});
