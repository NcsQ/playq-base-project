import { test } from '@playwright/test';
import { api } from '@playq/core';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('Negative/error validation example', async () => {
  await api.get('posts', 'notFound', baseUrl);
  await api.verifyError(404);
});
