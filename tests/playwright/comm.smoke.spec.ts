import { test, expect } from '@playwright/test';
import { comm, vars } from '@playq/core';

// Single, focused Comm smoke test

test.describe('Comm Smoke', () => {
  test('COMM: Store + Wait + Log', async () => {
    await comm.comment('Starting COMM smoke');
    await comm.storeValue('PlayQ', 'myVar');
    expect(vars.getValue('myVar')).toBe('PlayQ');
    await comm.waitInMilliSeconds(200);
    await comm.attachLog('COMM smoke done', 'text/plain', 'COMM');
  });
});
