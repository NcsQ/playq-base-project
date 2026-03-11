const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

/**
 * Generate HTML report from Cucumber JSON with embedded artifacts (screenshots, videos)
 * This script processes the JSON output and embeds attachments from the test-results/scenarios folder
 */
function generateHtmlReportWithArtifacts() {
  try {
    const isRerun = process.env.PLAYQ_IS_RERUN === 'true';
    const reportBaseName = isRerun ? 'cucumber-report-rerun' : 'cucumber-report';
    const jsonFile = `test-results/${reportBaseName}.json`;
    const htmlFile = `test-results/${reportBaseName}.html`;

    if (!fs.existsSync(jsonFile)) {
      console.log(`ℹ️ No JSON report found at ${jsonFile}, skipping artifact-embedded report generation`);
      return;
    }

    // Generate HTML report with embedded artifacts
    const options = {
      theme: 'bootstrap',
      jsonFile: jsonFile,
      output: htmlFile,
      reportSuiteAsScenarios: true,
      scenarioTimestamp: true,
      launchReport: false,
      metadata: {
        'App Version': '1.0.0',
        'Test Environment': process.env.PLAYQ_ENV || 'default',
        'Browser': 'Chromium',
        'Platform': process.platform,
        'Type': isRerun ? 'Rerun' : 'Fresh Run'
      }
    };

    reporter.generate(options);
    console.log(`✅ HTML report with artifacts generated: ${htmlFile}`);
  } catch (err) {
    console.warn(`⚠️  Failed to generate artifact-embedded report:`, err.message);
  }
}

generateHtmlReportWithArtifacts();
