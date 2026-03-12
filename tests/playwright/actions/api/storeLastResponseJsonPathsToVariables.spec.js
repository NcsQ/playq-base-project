"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlayQ Example: api.storeLastResponseJsonPathsToVariables
 *
 * Purpose: Store values from body/header/status/statusText into vars.
 * Steps:
 * - Call GET
 * - Store title, content-type, status, statusText
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const baseUrl = 'https://jsonplaceholder.typicode.com';
(0, test_1.test)('API: storeLastResponseJsonPathsToVariables populates vars', async () => {
    await core_1.api.get('jsonplaceholder', 'todo1', baseUrl);
    await core_1.api.storeLastResponseJsonPathsToVariables('title,h.content-type,s,t', 'var.title,var.contentType,var.status,var.statusText');
    (0, test_1.expect)(core_1.vars.getValue('var.title')).toBe('delectus aut autem');
    (0, test_1.expect)(String(core_1.vars.getValue('var.contentType')).toLowerCase()).toContain('application/json');
    (0, test_1.expect)(core_1.vars.getValue('var.status')).toBe('200');
    (0, test_1.expect)(typeof core_1.vars.getValue('var.statusText')).toBe('string');
});
