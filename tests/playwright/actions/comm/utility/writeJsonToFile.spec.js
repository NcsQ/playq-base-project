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
 * PlayQ Example: comm.writeJsonToFile
 *
 * Purpose: Write JSON data to a file using override mode.
 * Page: Not applicable.
 * PatternIQ: Not required.
 * Steps:
 * - Call comm.writeJsonToFile to write an object
 * - Read back file contents and assert structure
 */
const test_1 = require("@playwright/test");
const core_1 = require("@playq/core");
const fs = __importStar(require("fs"));
const filePath = 'comm-write.json';
(0, test_1.test)('Utility: writeJsonToFile writes object JSON', async () => {
    const data = { hello: 'world', count: 2 };
    await core_1.comm.writeJsonToFile(filePath, data, { override: true });
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    (0, test_1.expect)(parsed.hello).toBe('world');
    (0, test_1.expect)(parsed.count).toBe(2);
});
