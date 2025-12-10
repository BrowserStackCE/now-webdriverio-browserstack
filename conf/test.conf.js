const { config: baseConfig } = require("./base.conf.js");

const parallelConfig = {
  maxInstances: parseInt(process.env.BSTACK_PARALLELS) || 5,
  commonCapabilities: {
    "bstack:options": {
      userName: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      projectName: process.env.BROWSERSTACK_PROJECT_NAME,
      buildIdentifier: "#${BUILD_NUMBER}",
      buildName: process.env.BROWSERSTACK_BUILD_NAME,
      source: process.env.BROWSERSTACK_BUILD_NAME,
      networkLogs: "true",
      consoleLogs: "verbose",
      performance: "report",
      debug: "true",
      source: process.env.BROWSERSTACK_BUILD_NAME,
      "local": "true",
    },
  },
  services: [
    [
      "browserstack",
      {
        browserstackLocal: "true",
        testObservability: true,
        testObservabilityOptions: {
          projectName: process.env.BROWSERSTACK_PROJECT_NAME,
          buildName: process.env.BROWSERSTACK_BUILD_NAME,
          buildTag: process.env.BROWSERSTACK_BUILD_NAME,
          buildIdentifier: "#${BUILD_NUMBER}",
        },
        percy: "true",
        percyCaptureMode: "testcase",
        accessibility: "true",
        accessibilityOptions: {
          wcagVersion: "wcag21a",
          includeIssueType: {
            bestPractice: true,
            needsReview: true,
            experimental: false,
            advanced: false,
          },
        },
      },
    ],
  ],
  capabilities: JSON.parse(process.env.BSTACK_CAPS_JSON),
};

exports.config = { ...baseConfig, ...parallelConfig };

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = { ...caps[i], ...exports.config.commonCapabilities[i] };
});
