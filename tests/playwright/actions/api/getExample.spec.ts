import { test } from '@playwright/test';
import { api } from '@playq/core';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('GET example - posts', async () => {
  await api.get('posts', 'getAll', baseUrl);

  await api.verifyStatus(200);
  await api.verifyPathValue('[0].id', '1');
  await api.verifyPathValue('[0].userId', '1');
});
