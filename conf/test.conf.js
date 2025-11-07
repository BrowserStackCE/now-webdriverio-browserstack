const { config: baseConfig } = require("./base.conf.js");

const parallelConfig = {
  maxInstances: parseInt(process.env.BSTACK_PARALLELS) || 5,
  commonCapabilities: {
    "bstack:options": {
      projectName: "NOW-Web-Test",
      buildIdentifier: "#${BUILD_NUMBER}",
      buildName: "browserstack-now-nodejs-web",
      source: "webdriverio:sample-master:v1.2",
      networkLogs: "true",
      consoleLogs: "verbose",
      performance: "report",
      debug: "true",
    },
  },
  services: [
    [
      "browserstack",
      {
        testObservability: true,
        testObservabilityOptions: {
          buildTag: "run-${BUILD_NUMBER}",
          buildIdentifier: "#${BUILD_NUMBER}",
        },
        percy: "true",
        percyCaptureMode: "auto",
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
  capabilities: JSON.parse("[" + process.env.BSTACK_CAPS_JSON + "]"),
};

exports.config = { ...baseConfig, ...parallelConfig };

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = { ...caps[i], ...exports.config.commonCapabilities[i] };
});
