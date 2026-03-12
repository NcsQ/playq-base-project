/**
 * PlayQ Example: comm.writeJsonToFile
 *
 * Purpose: Write JSON data to a file using override mode.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.writeJsonToFile to write an object
 * - Read back file contents and assert structure
 */
import { test, expect } from '@playwright/test';
import { comm } from '@playq/core';
import * as fs from 'fs';

const filePath = 'comm-write.json';

test('Utility: writeJsonToFile writes object JSON', async () => {
  const data = { hello: 'world', count: 2 };
  await comm.writeJsonToFile(filePath, data, { override: true });
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(raw);
  expect(parsed.hello).toBe('world');
  expect(parsed.count).toBe(2);
});
