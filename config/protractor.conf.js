exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '../tests/scenarios/app.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  chromeOnly: true,

  baseUrl: 'http://0.0.0.0:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};