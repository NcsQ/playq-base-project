"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
// config/playwright/playwright.hooks.ts
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const config = {}; // placeholder until config unification
// Ensure PlayQ core preLoader runs before hooks (load addons/patterns)
require("@playq/core/dist/exec/preLoader");
let browser;
let context;
let page;
const browserType = core_1.vars.getConfigValue('browser.browserType');
const headless = true;
// const headless = (process.env.HEADLESS?.toLowerCase() === 'false')
//   ? false
//   : (process.env.HEADLESS?.toLowerCase() === 'true')
//   ? true
//   : config.browser.headless ?? true;
const getBrowserInstance = () => {
    switch (browserType) {
        case 'firefox': return test_1.firefox;
        case 'webkit': return test_1.webkit;
        default: return test_1.chromium;
    }
};
const test = test_1.test.extend({
    page: async ({}, use) => {
        var _a, _b, _c;
        // 🏗️ Session management based on config.browser.playwrightSession
        if ((((_a = config === null || config === void 0 ? void 0 : config.browser) === null || _a === void 0 ? void 0 : _a.playwrightSession) || core_1.vars.getConfigValue('browser.playwrightSession')) === 'shared' && !browser) {
            browser = await getBrowserInstance().launch({ headless });
            context = await browser.newContext();
            console.log(`✅ Playwright shared browser (${browserType}, headless=${headless}) launched`);
        }
        if (['isolated', 'perFile'].includes(((_b = config === null || config === void 0 ? void 0 : config.browser) === null || _b === void 0 ? void 0 : _b.playwrightSession) || core_1.vars.getConfigValue('browser.playwrightSession'))) {
            browser = await getBrowserInstance().launch({ headless });
            context = await browser.newContext();
        }
        core_1.webFixture.setSmartIQData([]);
        page = await context.newPage();
        await use(page);
        if (['isolated', 'perFile', 'perTest'].includes(((_c = config === null || config === void 0 ? void 0 : config.browser) === null || _c === void 0 ? void 0 : _c.playwrightSession) || core_1.vars.getConfigValue('browser.playwrightSession'))) {
            await page.close();
            await (context === null || context === void 0 ? void 0 : context.close());
            await (browser === null || browser === void 0 ? void 0 : browser.close());
            console.log(`✅ Playwright session closed (per test/file)`);
        }
    }
});
exports.test = test;
test.beforeEach(async ({}, testInfo) => {
    // Extract number from [-N-] at the end of the title
    const match = testInfo.title.match(/\[-(\d+)-\]$/);
    const iteration = match ? match[1] : "1";
    core_1.vars.setValue('playq.iteration.count', iteration);
});
test.afterAll(async () => {
    var _a;
    console.log('✅ TRIGERRING afterAll');
    if ((((_a = config === null || config === void 0 ? void 0 : config.browser) === null || _a === void 0 ? void 0 : _a.playwrightSession) || core_1.vars.getConfigValue('browser.playwrightSession')) === 'shared') {
        await (context === null || context === void 0 ? void 0 : context.close());
        await (browser === null || browser === void 0 ? void 0 : browser.close());
        console.log('✅ Playwright shared session closed');
    }
});
