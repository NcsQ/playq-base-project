"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: testData.generateSampleData
 *
 * Purpose: Generate sample data based on a flexible schema.
 * PatternIQ: Not applicable.
 * Steps:
 * - Provide a schema object (supports nested/arrays)
 * - Call web.generateSampleData
 * - Validate types of returned values
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
(0, test_1.test)('Generate sample data from schema', async () => {
    const schema = { firstName: 'string', lastName: 'string', age: 'number' };
    const data = await core_1.web.generateSampleData(schema);
    (0, test_1.expect)(typeof data.firstName).toBe('string');
    (0, test_1.expect)(typeof data.lastName).toBe('string');
    (0, test_1.expect)(typeof data.age).toBe('number');
    console.log('Generated Sample Data:', data);
});
