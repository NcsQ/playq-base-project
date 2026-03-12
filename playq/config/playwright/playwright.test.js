"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = exports.test = void 0;
const test_1 = require("@playwright/test");
Object.defineProperty(exports, "test", { enumerable: true, get: function () { return test_1.test; } });
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return test_1.expect; } });
require("@playwright-hook"); // Hooks file (now using @playq/core exports internally)
