module.exports = function(grunt) {

    var jsFiles = {
        'generated/all.js': [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/showdown/dist/showdown.min.js',
            'generated/templates.js',
            'app/src/app.js'
        ]
    };

    grunt.initConfig({
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
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
                    ignore: [
                        /Non-space characters found without seeing a doctype first/,
                        /Element “head” is missing a required instance of child element “title”/
                    ]
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
                files: jsFiles
            },
            dev: {
                options: {
                    beautify: true
                },
                files: jsFiles
            }
        },
        html2js: {
            options: {
                htmlmin: {
                    collapseWhitespace: true,
                    removeComments: true
                },
                base: '',
                useStrict: true
            },
            main: {
                src: ['app/templates/views/*.html'],
                dest: 'generated/templates.js'
            },
        },
    });

    grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-lesslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-html2js');

    grunt.registerTask('default', [
        'html2js:main',
        'lesslint',
        'less',
        'cssmin:dist',
        'jshint',
        'uglify:dist',
        'htmlmin:dist',
        'htmllint'
    ]);

    grunt.registerTask('dev', [
        'html2js:main',
        'lesslint',
        'less',
        'jshint',
        'uglify:dev',
        'htmlmin:dev',
        'htmllint'
    ]);

    grunt.registerTask('test', [
        'karma', //TODO
        'protractor' //TODO
    ]);

};