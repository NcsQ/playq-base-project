import { test } from '@playwright/test';
import { api } from '@playq/core';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('PUT example', async () => {
  await api.put('posts', 'update', baseUrl, { body: { id: 1, title: 'updated', body: 'bar', userId: 1 } });
  await api.verifyStatus(200);
  await api.verifyPathValue('id', '1');
});
