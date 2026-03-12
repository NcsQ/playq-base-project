"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Example: testData.loadFromJson
 *
 * Purpose: Loads JSON data from a file path.
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const jsonPath = 'PlayQ_PROJECT/test-data/sample.json';
(0, test_1.test)('Load JSON test data', async ({ page }) => {
    // Create a small JSON file if not exists via page fixture inaccessible; assume present
    const data = await core_1.web.loadFromJson(jsonPath);
    (0, test_1.expect)(typeof data).toBe('object');
    console.log('Loaded JSON Data:', data);
});
