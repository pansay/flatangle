'use strict';
/* global module */

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [

        // same as main app in gruntfile.js, just copy and paste it, be sure not to omit anything
        // TODO maybe extract it to a config json file, just to be sure...
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/showdown/dist/showdown.min.js',
        'generated/templates.js',
        //'generated/posts.js',
        'generated/config.js',
        'generated/texts.js',
        'app/src/routes.js',
        'app/src/services/converterService.js',
        'app/src/services/postsService-gh.js', // -gh, -grunt
        'app/src/controllers/mainController.js',
        'app/src/controllers/detailsController.js',
        'app/src/controllers/listController.js',
        'app/src/app.js',

        // karma specific
        'bower_components/angular-mocks/angular-mocks.js',
        'tests/helpers/*.js',
        'tests/specs/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/src/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
        'spec',
        'coverage'
    ],

    coverageReporter: {
        dir: 'reports',
        reporters: [
            { type: 'text'},
            { type: 'html', subdir: 'coverage'}
        ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    //logLevel: config.LOG_DEBUG,
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
        //'Chrome',
        'PhantomJS'
    ],
 
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom) 
      exitOnResourceError: true
    }

  });
};