import { test } from '@playwright/test';
import { api } from '@playq/core';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('Header validation example', async () => {
  await api.get('posts', 'getAll', baseUrl);
  await api.verifyHeader('content-type', 'application/json; charset=utf-8', { partial_text: true });
});
