/**
 * PlayQ Example: api.getLastResponseJsonPathValue
 *
 * Purpose: Extract a value from last response JSON via path.
 * Steps:
 * - Call GET
 * - Extract title using JSON path utility
 */
import { test, expect } from '@playwright/test';
import { api } from '@playq/core';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('API: getLastResponseJsonPathValue extracts title', async () => {
  await api.get('jsonplaceholder', 'todo1', baseUrl);
  const title = await api.getLastResponseJsonPathValue('x.title');
  expect(title).toBe('delectus aut autem');
});
