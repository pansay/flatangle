'use strict';

/* global exports */

exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '../tests/scenarios/app.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  chromeOnly: true,

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};