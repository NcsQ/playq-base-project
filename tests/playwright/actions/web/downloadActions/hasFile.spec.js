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
/**
 * PlayQ Example: web.hasFile
 *
 * Purpose: Verify a downloaded file exists on disk.
 * Page: LetCode → /file
 * PatternIQ: Used to resolve the "Download Text" link (pattern 'letcodesamples').
 * Steps:
 * - Open page
 * - Ensure download folder exists
 * - Download file via web.downloadFile
 * - Verify presence via web.hasFile
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const url = 'https://letcode.in/file';
(0, test_1.test)('Check file presence with hasFile', async ({ page }) => {
    await core_1.web.openBrowser(page, url);
    const downloadsRoot = path.join(process.env.PLAYQ_PROJECT_ROOT || process.cwd(), '_Temp', 'downloads');
    if (!fs.existsSync(downloadsRoot))
        fs.mkdirSync(downloadsRoot, { recursive: true });
    const savedPath = await core_1.web.downloadFile(page, 'Download Text', { pattern: 'letcodesamples', targetDir: downloadsRoot });
    const suggested = path.basename(savedPath);
    const exists = await core_1.web.hasFile(downloadsRoot, suggested);
    (0, test_1.expect)(exists).toBe(true);
});
