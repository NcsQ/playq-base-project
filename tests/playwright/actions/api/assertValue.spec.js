"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: api.assertValue (alias of verifyValue)
 *
 * Purpose: Assert actual equals expected with logs.
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
(0, test_1.test)('API: assertValue should verify two equal strings', async () => {
    // Arrange: Define the actual and expected values
    const actualValue = 'PlayQ-Framework';
    const expectedValue = 'PlayQ-Framework';
    // Act: Call the PlayQ API method to assert the values
    // (No transformation or side effect in this simple case)
    const assertionOptions = { assert: true };
    // Assert: Verify that actualValue equals expectedValue using PlayQ's assertValue
    await core_1.api.assertValue(actualValue, expectedValue, assertionOptions);
});
