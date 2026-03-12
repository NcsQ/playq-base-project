/**
 * PlayQ Example: api.storeLastResponseJsonPathsToVariables
 *
 * Purpose: Store values from body/header/status/statusText into vars.
 * Steps:
 * - Call GET
 * - Store title, content-type, status, statusText
 */
import { test, expect } from '@playwright/test';
import { api, vars } from '@playq/core';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test('API: storeLastResponseJsonPathsToVariables populates vars', async () => {
  await api.get('jsonplaceholder', 'todo1', baseUrl);
  await api.storeLastResponseJsonPathsToVariables('title,h.content-type,s,t', 'var.title,var.contentType,var.status,var.statusText');
  expect(vars.getValue('var.title')).toBe('delectus aut autem');
  expect(String(vars.getValue('var.contentType')).toLowerCase()).toContain('application/json');
  expect(vars.getValue('var.status')).toBe('200');
  expect(typeof vars.getValue('var.statusText')).toBe('string');
});
