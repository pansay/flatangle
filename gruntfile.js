'use strict';

/* global module */

module.exports = function(grunt) {

    var options = {};

    options.jsFiles = {
        'generated/all.js': [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/showdown/dist/showdown.min.js',
            'generated/templates.js',
            //'generated/posts.js',
            'generated/config.js',
            'generated/texts.js',
            'app/src/app.js',
            'app/src/routes.js',
            'app/src/services/converterService.js',
            'app/src/services/postsService-gh.js', // -gh, -grunt
            'app/src/controllers/mainController.js',
            'app/src/controllers/detailsController.js',
            'app/src/controllers/listController.js'
        ]
    };

    options.allJsFiles = [
        '*.js',
        'config/*.js',
        'app/**/*.js',
        'tests/**/*.js'
    ];

    options.htmllintIgnores = [
        /Start tag seen without seeing a doctype first/, // to pass angular partials
        /Non-space characters found without seeing a doctype first/, // to pass angular partials
        /Element “head” is missing a required instance of child element “title”/ // to pass angular partials
    ];

    options.htmlmin = {
        collapseWhitespace: true,
        removeComments: true
    };

    grunt.initConfig({
        htmlmin: {
            dist: {
                options: options.htmlmin,
                files: {
                    'index.html': 'app/templates/index.html',
                }
            },
            dev: {
                files: {
                    'index.html': 'app/templates/index.html'
                }
            }
        },
        htmllint: {
            all: {
                src: [
                    'app/templates/**/*.html',
                    'index.html'
                ],
                options: {
                    ignore: options.htmllintIgnores
                }
            }
        },
        lesslint: {
            src: ['app/styles/main.less'],
            options: {
                csslint: {
                    'ids': false
                }
            }
        },
        less: {
            all: {
                files: {
                    'generated/all.css': 'app/styles/main.less'
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'generated/all.css': 'generated/all.css'
                }
            }
        },
        jscs: {
            all: options.allJsFiles,
            options: {
                config: 'config/.jscsrc'
            }
        },
        jshint: {
            all: options.allJsFiles,
            options: {
                bitwise: true,
                freeze: true,
                curly: true,
                eqeqeq: true,
                futurehostile: true,
                forin: true,
                noarg: true,
                nocomma: true,
                nonbsp: true,
                nonew: true,
                undef: true,
                shadow: 'outer',
                strict: 'global',
                globalstrict: true,
                latedef: true,
                unused: 'strict'
            },
        },
        uglify: {
            dist: {
                files: options.jsFiles
            },
            dev: {
                options: {
                    beautify: true
                },
                files: options.jsFiles
            }
        },
        html2js: {
            options: {
                htmlmin: options.htmlmin,
                base: '',
                useStrict: true
            },
            main: {
                src: ['app/templates/views/*.html'],
                dest: 'generated/templates.js'
            },
        },
        'folder_list': {
            options: {
                files: true,
                folders: false
            },
            posts: {
                files: {
                    'generated/posts.json': ['content/posts/*.md']
                }
            }
        },
        csvjson: {
            texts: {
                files: {
                    'generated/texts/': ['content/texts/texts.csv']
                }
            }
        },
        jsonlint: {
            all: {
                src: ['config/config.json']
            }
        },
        json: {
            posts: {
                options: {
                    namespace: 'posts',
                    includePath: false,
                    processName: function(filename) {
                        return filename.toLowerCase();
                    }
                },
                src: 'generated/posts.json',
                dest: 'generated/posts.js'
            },
            config: {
                options: {
                    namespace: 'config',
                    includePath: false,
                    processName: function(filename) {
                        return filename.toLowerCase();
                    }
                },
                src: 'config/config.json',
                dest: 'generated/config.js'
            },
            texts: {
                options: {
                    namespace: 'texts',
                    includePath: false,
                    processName: function(filename) {
                        return filename.toLowerCase();
                    }
                },
                src: ['generated/texts/*.json'],
                dest: 'generated/texts.js'
            }
        },
        karma: {
            all: {
                configFile: 'config/karma.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin'); // minify html
    grunt.loadNpmTasks('grunt-html'); // validate html

    grunt.loadNpmTasks('grunt-contrib-less'); // parse less
    grunt.loadNpmTasks('grunt-lesslint'); // validate less
    grunt.loadNpmTasks('grunt-contrib-cssmin'); // minify css

    grunt.loadNpmTasks('grunt-contrib-jshint'); // validate js
    grunt.loadNpmTasks("grunt-jscs"); // validate js some more
    grunt.loadNpmTasks('grunt-contrib-uglify'); // minify js

    grunt.loadNpmTasks('grunt-html2js'); // precache angular templates

    // grunt.loadNpmTasks('grunt-folder-list'); // generate json from a folder's files
    grunt.loadNpmTasks('grunt-csv-json'); // generate json from csv
    grunt.loadNpmTasks('grunt-jsonlint'); // validate json
    grunt.loadNpmTasks('grunt-json'); // convert that json to js object

    grunt.loadNpmTasks('grunt-karma'); // unit tests


    // merely update posts list
    // grunt.registerTask('posts', [
    //     'folder_list:posts',
    //     'json:posts'
    // ]);

    // merely update texts
    grunt.registerTask('texts', [
        'csvjson:texts',
        'json:texts'
    ]);

    // merely update posts list and refresh app js with it
    // grunt.registerTask('update', [
    //     'posts',
    //     'uglify:dist'
    // ]);

    // just js/html dev
    grunt.registerTask('jsdev', [
        //'posts',
        'texts',
        'jsonlint:all',
        'json:config',
        'html2js:main',
        'jshint',
        'jscs',
        'uglify:dev',
        'htmlmin:dev',
        'htmllint'
    ]);

    // just js/html dist
    grunt.registerTask('jsdist', [
        //'posts',
        'texts',
        'jsonlint:all',
        'json:config',
        'html2js:main',
        'jshint',
        'jscs',
        'uglify:dist',
        'htmlmin:dist',
        'htmllint'
    ]);

    // less only
    grunt.registerTask('lesscss', [
        'lesslint',
        'less'
    ]);

    // dev / unminified
    grunt.registerTask('dev', [
        'lesscss',
        'jsdev'
    ]);

    // default / dist / prod / minified
    grunt.registerTask('default', [
        'lesscss',
        'cssmin:dist',
        'jsdist',
    ]);

    // tests
    grunt.registerTask('test', [
        'karma'
        //'protractor' //TODO
    ]);

};