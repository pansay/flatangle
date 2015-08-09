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
            'app/src/routes.js',
            'app/src/services/converterService.js',
            'app/src/services/postsService-gh.js', // -gh, -grunt
            'app/src/controllers.js',
            'app/src/app.js'
        ]
    };

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
        jshint: {
            all: [
                'Gruntfile.js',
                'karma.conf.js',
                'app/**/*.js'
            ]
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
        folder_list: {
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
        json: {
            posts: {
                options: {
                    namespace: 'json',
                    includePath: false,
                    processName: function(filename) {
                        return filename.toLowerCase();
                    }
                },
                src: ['generated/posts.json'],
                dest: 'generated/posts.js'
            },
            config: {
                options: {
                    namespace: 'json',
                    includePath: false,
                    processName: function(filename) {
                        return filename.toLowerCase();
                    }
                },
                src: ['config.json'],
                dest: 'generated/config.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin'); // minify html
    grunt.loadNpmTasks('grunt-html'); // validate html

    grunt.loadNpmTasks('grunt-contrib-less'); // parse less
    grunt.loadNpmTasks('grunt-lesslint'); // validate less
    grunt.loadNpmTasks('grunt-contrib-cssmin'); // minify css

    grunt.loadNpmTasks('grunt-contrib-jshint'); // validate js
    grunt.loadNpmTasks('grunt-contrib-uglify'); // minify js

    grunt.loadNpmTasks('grunt-html2js'); // precache angular templates

    grunt.loadNpmTasks('grunt-folder-list'); // generate json from a folder's files
    grunt.loadNpmTasks('grunt-json'); // convert it to js object


    // merely update posts list
    grunt.registerTask('posts', [
        'folder_list:posts',
        'json:posts'
    ]);

    // merely update posts list and refresh app js with it
    grunt.registerTask('update', [
        //'posts',
        'uglify:dist'
    ]);

    // just js/html dev
    grunt.registerTask('jsdev', [
        //'posts',
        'json:config',
        'html2js:main',
        'jshint',
        'uglify:dev',
        'htmlmin:dev',
        'htmllint'
    ]);

    // just js/html dist
    grunt.registerTask('jsdist', [
        //'posts',
        'json:config',
        'html2js:main',
        'jshint',
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
        'karma', //TODO
        'protractor' //TODO
    ]);

};