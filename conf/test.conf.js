const { config: baseConfig } = require("./base.conf.js");

const parallelConfig = {
  maxInstances: parseInt(process.env.BSTACK_PARALLELS) || 5,
  commonCapabilities: {
    "bstack:options": {
      buildIdentifier: "#${DATE_TIME}",
      buildName: "browserstack-now-nodejs-web",
      source: "webdriverio:sample-master:v1.2",
    },
  },
  services: [
    [
      "browserstack",
      {
        testObservability: true,
        testObservabilityOptions: {
          buildTag: "run-3",
          buildIdentifier: "#${DATE_TIME}",
        },
        percy: "true",
        accessibility: "true",
        percyCaptureMode: "auto",
      },
    ],
  ],
  capabilities: [
    process.env.BSTACK_CAPS_JSON.replace(/^['"]|['"]$/g, '')
  ],
};

exports.config = { ...baseConfig, ...parallelConfig };

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = { ...caps[i], ...exports.config.commonCapabilities[i] };
});
