import { test } from '@playwright/test';
import { api, comm } from '@playq/core';

// Single, focused API smoke test

test.describe('API Smoke', () => {
  test('API: GET/POST verification', async () => {
    await api.get('jsonplaceholder', 'todo1', 'https://jsonplaceholder.typicode.com');
    await api.assertPathValue('id', '1');
    const title = await api.getPathValueFromLastResponse('title');
    await comm.attachLog(`Title: ${title}`, 'text/plain', 'API');

    await api.post('httpbin', 'postEcho', 'https://httpbin.org');
    await api.assertPathValue('json.json.hello', 'world');
  });
});
