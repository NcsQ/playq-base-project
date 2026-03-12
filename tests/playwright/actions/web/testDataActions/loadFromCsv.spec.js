"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Example: testData.loadFromCsv
 *
 * Purpose: Loads CSV data from a file path and verifies rows.
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const csvPath = 'PlayQ_PROJECT/test-data/lambdaTest.csv';
(0, test_1.test)('Load CSV test data', async ({ page }) => {
    const rows = await core_1.web.loadFromCsv(csvPath);
    (0, test_1.expect)(Array.isArray(rows)).toBeTruthy();
    (0, test_1.expect)(rows.length).toBeGreaterThan(0);
    console.log('Loaded CSV Rows:', rows);
});
