"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// playwright.config.ts
const test_1 = require("@playwright/test");
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
// Ensure the project-level "pretest" script runs before the Playwright
// config evaluation. We run it synchronously so that environment/fixtures
// it prepares are available when the rest of this file executes. This
// is useful when launching tests from VS Code (Play button) because the
// Playwright runner loads this config file directly.
if (!process.env.PLAYQ_PRETEST_LOADED) {
    try {
        // Try resolving the pretest script directly. If the package layout
        // is non-standard (monorepo, workspace), fall back to resolving the
        // package main and constructing the path to dist/scripts/pretest.js
        let pretestPath;
        try {
            pretestPath = require.resolve('@playq/core/dist/scripts/pretest');
        }
        catch (_a) {
            const coreMain = require.resolve('@playq/core');
            const candidate = path.resolve(path.dirname(coreMain), 'dist', 'scripts', 'pretest.js');
            if (fs.existsSync(candidate)) {
                pretestPath = candidate;
            }
            else {
                // try one level up if package main points into dist already
                const candidate2 = path.resolve(path.dirname(coreMain), '..', 'dist', 'scripts', 'pretest.js');
                if (fs.existsSync(candidate2))
                    pretestPath = candidate2;
            }
        }
        if (!pretestPath)
            throw new Error('pretest script not found in @playq/core');
        // Run the pretest script in a separate Node process so it doesn't
        // interfere with ts-node/module state. We inherit stdio so logs
        // are visible in the VS Code terminal.
        // Log explicitly so the VS Code terminal shows the preloader ran.
        // eslint-disable-next-line no-console
        console.log('⏳ Running playq pretest:', pretestPath);
        (0, child_process_1.execFileSync)(process.execPath, [pretestPath], { stdio: 'inherit' });
        process.env.PLAYQ_PRETEST_LOADED = '1';
    }
    catch (e) {
        // Don't fail the config load; just warn so tests can still run.
        // If pretest is essential, remove the try/catch so failures surface.
        // eslint-disable-next-line no-console
        console.warn('⚠️ playq pretest loader failed:', e && e.message ? e.message : e);
    }
}
// Direct imports to avoid alias resolution issues during packaging
// Use public entrypoint from @playq/core
const core_1 = require("@playq/core");
const { getConfigValue, getValue, initVars } = core_1.vars;
(0, core_1.loadEnv)();
// Ensure config/variables are loaded in this process (ts-node is registered by JS shim)
if (typeof initVars === 'function') {
    try {
        initVars();
    }
    catch (e) { }
}
console.log('🌐 Loaded environment variables:');
console.log('🌐 browser.browserType:', getConfigValue('browser.browserType'));
console.log('🌐 testExecution.timeout:', getConfigValue('testExecution.timeout'));
// Resolve project root from this config file's directory
const PROJECT_ROOT = path.resolve(__dirname, '../../../');
exports.default = (0, test_1.defineConfig)({
    globalSetup: require.resolve('./playwright.global-setup'),
    globalTeardown: require.resolve('./playwright.global-teardown'),
    testDir: path.resolve(PROJECT_ROOT, 'tests/playwright'),
    // All reports and artifacts under test-results/ folder
    outputDir: path.resolve(PROJECT_ROOT, 'test-results/artifacts'),
    workers: 1, // prevent multiple browsers in this template
    timeout: Number(getConfigValue('testExecution.timeout')),
    retries: 2,
    reporter: [
        // Blob reporter enables merging multiple runs into one HTML report
        ['blob', { outputDir: path.resolve(PROJECT_ROOT, 'test-results/blob-report') }],
        ['html', { open: 'never', outputFolder: path.resolve(PROJECT_ROOT, 'test-results/playwright-report') }],
        ['json', { outputFile: path.resolve(PROJECT_ROOT, 'test-results/playwright-report/playwright-report.json') }],
        ['allure-playwright', { outputFolder: path.resolve(PROJECT_ROOT, 'test-results/allure-results') }],
        ['junit', { outputFile: path.resolve(PROJECT_ROOT, 'test-results/e2e-junit-results.xml') }],
        ['github']
    ],
    use: {
        browserName: getValue('config.browser.browserType'),
        headless: false,
        baseURL: 'https://ncs.co/',
        viewport: { width: 1480, height: 720 },
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        video: 'on',
        actionTimeout: Number(getConfigValue('testExecution.actionTimeout')),
        navigationTimeout: Number(getConfigValue('testExecution.navigationTimeout')),
    },
});
