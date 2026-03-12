
// Preprocess feature files into _Temp/execution before exporting config.
// This ensures Step Groups, Examples data filters, SmartIQ, and variable replacement are applied.
const fs = require('fs');
const path = require('path');

function runPreprocessingOnce() {
  if (process.env.PLAYQ_PREPROCESSED) return; // idempotent guard
  try {
    const { generateStepGroupsIfNeeded } = require('@playq/core/dist/exec/sgGenerator.js');
    const { preprocessFeatureFile } = require('@playq/core/dist/exec/featureFilePreProcess.js');

    // 1. Generate / refresh Step Group cache & step defs
    generateStepGroupsIfNeeded(false);

    // 2. Determine which features to preprocess
    let featuresToProcess = [];
    const isRerun = process.env.PLAYQ_IS_RERUN === 'true';
    
    if (isRerun) {
      // RERUN MODE: Only preprocess features from @rerun.txt
      const rerunFile = path.resolve('@rerun.txt');
      if (fs.existsSync(rerunFile)) {
        const rerunContent = fs.readFileSync(rerunFile, 'utf-8');
        const scenarioPaths = rerunContent.split('\n').map(l => l.trim()).filter(Boolean);
        
        // Extract unique feature file paths and convert back to source paths
        const uniqueFeatures = new Set();
        scenarioPaths.forEach(scenarioPath => {
          // Remove line numbers: "_Temp/execution/forms.feature:8" -> "_Temp/execution/forms.feature"
          const normalized = scenarioPath.replace(/\\/g, '/');
          const lastColonIdx = normalized.lastIndexOf(':');
          const featurePath = lastColonIdx > -1 ? normalized.substring(0, lastColonIdx) : normalized;
          // Convert back to source: "_Temp/execution/forms.feature" -> "tests/bdd/scenarios/forms.feature"
          let sourcePath = featurePath.replace('_Temp/execution/', 'tests/bdd/scenarios/');
          sourcePath = sourcePath.replace(/^execution\//, 'tests/bdd/scenarios/');
          uniqueFeatures.add(sourcePath);
        });
        
        featuresToProcess = Array.from(uniqueFeatures);
        console.log(`✅ RERUN MODE: Preprocessing ${featuresToProcess.length} feature(s) from @rerun.txt:`, featuresToProcess);
      } else {
        console.warn('⚠️  RERUN MODE: @rerun.txt not found, preprocessing all features');
        // Fall back to normal mode
        const srcRoot = path.resolve('tests/bdd/scenarios');
        if (fs.existsSync(srcRoot)) {
          const walk = (dir) => {
            for (const entry of fs.readdirSync(dir)) {
              const full = path.join(dir, entry);
              const stat = fs.statSync(full);
              if (stat.isDirectory()) walk(full);
              else if (entry.endsWith('.feature')) featuresToProcess.push(full);
            }
          };
          walk(srcRoot);
        }
      }
    } else {
      // FRESH RUN: Preprocess all features
      const srcRoot = path.resolve('tests/bdd/scenarios');
      if (fs.existsSync(srcRoot)) {
        const walk = (dir) => {
          for (const entry of fs.readdirSync(dir)) {
            const full = path.join(dir, entry);
            const stat = fs.statSync(full);
            if (stat.isDirectory()) walk(full);
            else if (entry.endsWith('.feature')) featuresToProcess.push(full);
          }
        };
        walk(srcRoot);
      }
      console.log(`ℹ️  FRESH RUN: Preprocessing ${featuresToProcess.length} feature(s)`);
    }

    // 3. Clean up execution folder BEFORE preprocessing (especially important for reruns)
    // This ensures only the rerun-requested features are present in _Temp/execution
    const outRoot = path.resolve('_Temp', 'execution');
    if (fs.existsSync(outRoot)) {
      fs.rmSync(outRoot, { recursive: true, force: true });
      console.log(`🧹 Cleaned execution folder before preprocessing: ${outRoot}`);
    }
    fs.mkdirSync(outRoot, { recursive: true });

    // 4. Preprocess each feature
    featuresToProcess.forEach(featurePath => {
      try {
        preprocessFeatureFile(featurePath);
      } catch (err) {
        console.warn(`⚠️  Failed to preprocess ${featurePath}:`, (err.message || err));
      }
    });
    
    process.env.PLAYQ_PREPROCESSED = '1';
    console.log('✅ Cucumber preprocessing complete: _Temp/execution');
  } catch (err) {
    console.error('❌ Preprocessing failed (features may not expand Step Groups):', err);
  }
}

runPreprocessingOnce();

module.exports = {
    default: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        // Execute only processed feature files
        paths: ["./_Temp/execution/**/*.feature"],
        dryRun: false,
    require: [
      // Enable TS support and path aliases
      "ts-node/register",
      "tsconfig-paths/register",
      // Register parameter types BEFORE any step definitions using {param}
      "./playq/config/cucumber/parameterHook.ts",
            // Step group step definitions are loaded via the project shim (test/steps/playq-core.steps.ts)
      // Global timeouts for steps/hooks
      "./playq/config/cucumber/timeouts.ts",
            // Generated Step Group step definitions
            "./tests/bdd/steps/_step_group/stepGroup_steps.ts",
            // Core step defs shim (imports @playq/core dist step-defs)
            "./playq/config/cucumber/playq-core.steps.ts",
            // Local aliases and project step defs
            "./tests/bdd/steps/**/*.ts",
            // Project addons (steps + actions)
            "./playq/addons/**/*.ts",
            // Cucumber hooks (project-level)
            "./playq/config/cucumber/hooks.ts"
        ],
        requireModule: [
            "ts-node/register",
            "tsconfig-paths/register"
        ],
        format: (() => {
            const isRerun = process.env.PLAYQ_IS_RERUN === 'true';
            const reportBaseName = isRerun ? 'cucumber-report-rerun' : 'cucumber-report';
            return [
                "progress-bar",
                `html:test-results/${reportBaseName}.html`,
                `json:test-results/${reportBaseName}.json`
            ];
        })(),
        parallel: 1
    }
}