import { test } from '@playwright/test';
import { api } from '@playq/core';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('Schema validation example', async () => {
  await api.get('posts', 'getAll', baseUrl);
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
  await api.verifySchema(schema);
});
