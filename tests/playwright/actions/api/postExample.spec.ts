import { test } from '@playwright/test';
import { api } from '@playq/core';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('POST example', async () => {
  await api.post('posts', 'create', baseUrl, { body: { title: 'foo', body: 'bar', userId: 1 } });
  await api.verifyStatus(201);
  await api.verifyPathValue('id', '101');
});
