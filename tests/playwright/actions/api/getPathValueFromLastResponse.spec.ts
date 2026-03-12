/**
 * PlayQ Example: api.getPathValueFromLastResponse
 *
 * Purpose: Extract a flexible path value (body/header/status/statusText).
 * Steps:
 * - Call GET
 * - Use helper to read 'title' and assert
 */
import { test, expect } from '@playwright/test';
import { api } from '@playq/core';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('API: getPathValueFromLastResponse reads body title', async () => {
  await api.get('jsonplaceholder', 'todo1', baseUrl);
  const title = await api.getPathValueFromLastResponse('title');
  expect(title).toBe('delectus aut autem');
});
