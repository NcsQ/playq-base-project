"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: web.dragAndDrop
 *
 * Purpose: Drag element from source to target using PatternIQ-resolved locators.
 * Page: The Internet → /drag_and_drop
 * PatternIQ: pattern 'theinternet', fieldType 'column' (ids 'column-a' → 'column-b')
 * Steps:
 * - Open page
 * - Resolve source/target via PatternIQ field type 'column'
 * - Perform drag and drop
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://the-internet.herokuapp.com/drag_and_drop';
(0, test_1.test)('Mouse: dragAndDrop column A to column B', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    await core_1.web.dragAndDrop(page, 'column-a', 'column-b', { pattern: 'theinternet', fieldType: 'column' });
});
