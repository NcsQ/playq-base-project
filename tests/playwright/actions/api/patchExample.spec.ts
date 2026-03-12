import { test } from '@playwright/test';
import { api } from '@playq/core';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('PATCH example', async () => {
  await api.patch('posts', 'patch', baseUrl, { body: { title: 'patched' } });
  await api.verifyStatus(200);
});
