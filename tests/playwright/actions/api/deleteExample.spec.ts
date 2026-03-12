import { test } from '@playwright/test';
import { api } from '@playq/core';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('DELETE example', async () => {
  await api.del('posts', 'delete', baseUrl);
  await api.verifyStatus(200);
});
