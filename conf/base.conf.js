exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",

  updateJob: false,
  specs: ["../tests/specs/*.js"],
  exclude: [],

  logLevel: "warn",
  coloredLogs: true,
  screenshotPath: "./errorShots/",

  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,

  before: function () {
    var chai = require("chai");
    global.expect = chai.expect;
    chai.Should();
  },

  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
