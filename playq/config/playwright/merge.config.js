// Playwright merge-reports config to normalize testDir across runs
// Use with: npx playwright merge-reports -c playq/config/playwright/merge.config.js --reporter html ./blob-report_merge
module.exports = {
  // Point to the canonical tests location relative to project root
  testDir: 'tests/playwright',
};