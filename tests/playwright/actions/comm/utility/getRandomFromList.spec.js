"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: comm.getRandomFromList
 *
 * Purpose: Select a random item from a list.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.getRandomFromList on a small array
 * - Assert the returned value is one of the items
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const items = ['red', 'green', 'blue'];
(0, test_1.test)('Utility: getRandomFromList returns an item from the list', async () => {
    const chosen = await core_1.comm.getRandomFromList(items);
    (0, test_1.expect)(items).toContain(chosen);
    console.log('Randomly chosen item:', chosen);
});
