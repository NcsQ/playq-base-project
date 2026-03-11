"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Keep teardown minimal to avoid heavy imports; Playwright closes browsers itself.
exports.default = async () => {
    console.log('🧹 Playwright global teardown');
};
