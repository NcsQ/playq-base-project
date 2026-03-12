"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Example: web.storeElementTextInVariable
 *
 * Purpose: Stores an element's text into a PlayQ variable.
 * Site: letcode.in/elements
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const url = 'https://letcode.in/elements';
(0, test_1.test)('Store Search button text in variable', async ({ page }) => {
    var _a, _b, _c, _d, _e;
    await core_1.web.openBrowser(page, url);
    await core_1.web.storeElementTextInVariable(page, 'Search', 'searchButtonText', { trim: true, normalizeWhitespace: true, fieldType: 'button', pattern: 'letcodesamples' });
    const stored = (_c = (_b = (_a = core_1.vars).getValue) === null || _b === void 0 ? void 0 : _b.call(_a, 'searchButtonText')) !== null && _c !== void 0 ? _c : (_e = (_d = core_1.vars).get) === null || _e === void 0 ? void 0 : _e.call(_d, 'searchButtonText');
    (0, test_1.expect)(stored).toBe('Search');
});
