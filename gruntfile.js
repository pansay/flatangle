module.exports = function(grunt) {

    var jsFiles = {
        'generated/all.js': [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/showdown/dist/showdown.min.js',
            'app/app.js'
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
        }
    });

    grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-lesslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [
        'lesslint',
        'less',
        'cssmin:dist',
        'jshint',
        'uglify:dist',
        'htmlmin:dist',
        'htmllint'
    ]);

    grunt.registerTask('dev', [
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