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
            'app/src/routes.js',
            'app/src/services/converterService.js',
            'app/src/services/postsService-gh.js', // -gh, -grunt
            'app/src/controllers/mainController.js',
            'app/src/controllers/detailsController.js',
            'app/src/controllers/listController.js',
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
                '*.js',
                'config/*.js',
                'app/**/*.js',
                'tests/**/*.js'
            ],
            options: {

                /**
                 * This option prohibits the use of bitwise operators such as `^` (XOR),
                 * `|` (OR) and others. Bitwise operators are very rare in JavaScript
                 * programs and quite often `&` is simply a mistyped `&&`.
                 */
                bitwise     : true,

                /**
                 *
                 * This options prohibits overwriting prototypes of native objects such as
                 * `Array`, `Date` and so on.
                 *
                 *     // jshint freeze:true
                 *     Array.prototype.count = function (value) { return 4; };
                 *     // -> Warning: Extending prototype of native object: 'Array'.
                 */
                freeze      : true,

                /**
                 * This option allows you to force all variable names to use either
                 * camelCase style or UPPER_CASE with underscores.
                 *
                 * @deprecated JSHint is limiting its scope to issues of code correctness.
                 *             If you would like to enforce rules relating to code style,
                 *             check out [the JSCS
                 *             project](https://github.com/jscs-dev/node-jscs).
                 */
                camelcase   : true,

                /**
                 * This option requires you to always put curly braces around blocks in
                 * loops and conditionals. JavaScript allows you to omit curly braces when
                 * the block consists of only one statement, for example:
                 *
                 *     while (day)
                 *       shuffle();
                 *
                 * However, in some circumstances, it can lead to bugs (you'd think that
                 * `sleep()` is a part of the loop while in reality it is not):
                 *
                 *     while (day)
                 *       shuffle();
                 *       sleep();
                 */
                curly       : true,

                /**
                 * This options prohibits the use of `==` and `!=` in favor of `===` and
                 * `!==`. The former try to coerce values before comparing them which can
                 * lead to some unexpected results. The latter don't do any coercion so
                 * they are generally safer. If you would like to learn more about type
                 * coercion in JavaScript, we recommend [Truth, Equality and
                 * JavaScript](http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/)
                 * by Angus Croll.
                 */
                eqeqeq      : true,

                /**
                 * This option enables warnings about the use of identifiers which are
                 * defined in future versions of JavaScript. Although overwriting them has
                 * no effect in contexts where they are not implemented, this practice can
                 * cause issues when migrating codebases to newer versions of the language.
                 */
                futurehostile: true,

                /**
                 * This option suppresses warnings about invalid `typeof` operator values.
                 * This operator has only [a limited set of possible return
                 * values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).
                 * By default, JSHint warns when you compare its result with an invalid
                 * value which often can be a typo.
                 *
                 *     // 'fuction' instead of 'function'
                 *     if (typeof a == "fuction") { // Invalid typeof value 'fuction'
                 *       // ...
                 *     }
                 *
                 * Do not use this option unless you're absolutely sure you don't want
                 * these checks.
                 */
                notypeof    : true,

                /**
                 * This option requires all `for in` loops to filter object's items. The
                 * for in statement allows for looping through the names of all of the
                 * properties of an object including those inherited through the prototype
                 * chain. This behavior can lead to unexpected items in your object so it
                 * is generally safer to always filter inherited properties out as shown in
                 * the example:
                 *
                 *     for (key in obj) {
                 *       if (obj.hasOwnProperty(key)) {
                 *         // We are sure that obj[key] belongs to the object and was not inherited.
                 *       }
                 *     }
                 *
                 * For more in-depth understanding of `for in` loops in JavaScript, read
                 * [Exploring JavaScript for-in
                 * loops](http://javascriptweblog.wordpress.com/2011/01/04/exploring-javascript-for-in-loops/)
                 * by Angus Croll.
                 */
                forin       : true,


                /**
                 * This option prohibits the use of immediate function invocations without
                 * wrapping them in parentheses. Wrapping parentheses assists readers of
                 * your code in understanding that the expression is the result of a
                 * function, and not the function itself.
                 *
                 * @deprecated JSHint is limiting its scope to issues of code correctness.
                 *             If you would like to enforce rules relating to code style,
                 *             check out [the JSCS
                 *             project](https://github.com/jscs-dev/node-jscs).
                 */
                immed       : true,

                /**
                 * This option suppresses warnings about the `__iterator__` property. This
                 * property is not supported by all browsers so use it carefully.
                 */
                iterator    : true,

                /**
                 * This option requires you to capitalize names of constructor functions.
                 * Capitalizing functions that are intended to be used with `new` operator
                 * is just a convention that helps programmers to visually distinguish
                 * constructor functions from other types of functions to help spot
                 * mistakes when using `this`.
                 *
                 * Not doing so won't break your code in any browsers or environments but
                 * it will be a bit harder to figure out—by reading the code—if the
                 * function was supposed to be used with or without new. And this is
                 * important because when the function that was intended to be used with
                 * `new` is used without it, `this` will point to the global object instead
                 * of a new object.
                 *
                 * @deprecated JSHint is limiting its scope to issues of code correctness.
                 *             If you would like to enforce rules relating to code style,
                 *             check out [the JSCS
                 *             project](https://github.com/jscs-dev/node-jscs).
                 */
                newcap      : true,

                /**
                 * This option prohibits the use of `arguments.caller` and
                 * `arguments.callee`.  Both `.caller` and `.callee` make quite a few
                 * optimizations impossible so they were deprecated in future versions of
                 * JavaScript. In fact, ECMAScript 5 forbids the use of `arguments.callee`
                 * in strict mode.
                 */
                noarg       : true,

                /**
                 * This option prohibits the use of the comma operator. When misused, the
                 * comma operator can obscure the value of a statement and promote
                 * incorrect code.
                 */
                nocomma     : true,

                /**
                 * This option warns when you have an empty block in your code. JSLint was
                 * originally warning for all empty blocks and we simply made it optional.
                 * There were no studies reporting that empty blocks in JavaScript break
                 * your code in any way.
                 *
                 * @deprecated JSHint is limiting its scope to issues of code correctness.
                 *             If you would like to enforce rules relating to code style,
                 *             check out [the JSCS
                 *             project](https://github.com/jscs-dev/node-jscs).
                 */
                noempty     : true,

                /**
                 * This option warns about "non-breaking whitespace" characters. These
                 * characters can be entered with option-space on Mac computers and have a
                 * potential of breaking non-UTF8 web pages.
                 */
                nonbsp      : true,

                /**
                 * This option prohibits the use of constructor functions for side-effects.
                 * Some people like to call constructor functions without assigning its
                 * result to any variable:
                 *
                 *     new MyConstructor();
                 *
                 * There is no advantage in this approach over simply calling
                 * `MyConstructor` since the object that the operator `new` creates isn't
                 * used anywhere so you should generally avoid constructors like this one.
                 */
                nonew       : true,

                /**
                 * This option prohibits the use of explicitly undeclared variables. This
                 * option is very useful for spotting leaking and mistyped variables.
                 *
                 *     // jshint undef:true
                 *
                 *     function test() {
                 *       var myVar = 'Hello, World';
                 *       console.log(myvar); // Oops, typoed here. JSHint with undef will complain
                 *     }
                 *
                 * If your variable is defined in another file, you can use the `global`
                 * directive to tell JSHint about it.
                 */
                undef       : true,

                /**
                 * This option prohibits the use of the grouping operator when it is not
                 * strictly required. Such usage commonly reflects a misunderstanding of
                 * unary operators, for example:
                 *
                 *     // jshint singleGroups: true
                 *
                 *     delete(obj.attr); // Warning: Unnecessary grouping operator.
                 */
                singleGroups: false,

                /**
                 * When set to true, the use of VariableStatements are forbidden.
                 * For example:
                 *
                 *     // jshint varstmt: true
                 *
                 *     var a; // Warning: `var` declarations are forbidden. Use `let` or `const` instead.
                 */
                varstmt: false,

                /**
                * This option suppresses warnings about variable shadowing i.e. declaring a
                * variable that had been already declared somewhere in the outer scope.
                *
                * - "inner"  - check for variables defined in the same scope only
                * - "outer"  - check for variables defined in outer scopes as well
                * - false    - same as inner
                * - true     - allow variable shadowing
                */
                shadow       : 'outer',


                /**
                * This option requires the code to run in ECMAScript 5's strict mode.
                * [Strict mode](https://developer.mozilla.org/en/JavaScript/Strict_mode)
                * is a way to opt in to a restricted variant of JavaScript. Strict mode
                * eliminates some JavaScript pitfalls that didn't cause errors by changing
                * them to produce errors.  It also fixes mistakes that made it difficult
                * for the JavaScript engines to perform certain optimizations.
                *
                * - "func"    - there must be a `"use strict";` directive at function level
                * - "global"  - there must be a `"use strict";` directive at global level
                * - "implied" - lint the code as if there is the `"use strict";` directive
                * - false     - disable warnings about strict mode
                * - true      - same as `"func"`, but environment options have precedence over
                *               this (e.g. `node`, `module`, `browserify` and `phantomjs` can
                *               set `strict: global`)
                */
                strict      : 'global',
                globalstrict: true,

                /**
                * This option prohibits the use of a variable before it was defined.
                * JavaScript has function scope only and, in addition to that, all variables
                * are always moved—or hoisted— to the top of the function. This behavior can
                * lead to some very nasty bugs and that's why it is safer to always use
                * variable only after they have been explicitly defined.
                *
                * Setting this option to "nofunc" will allow function declarations to be
                * ignored.
                *
                * For more in-depth understanding of scoping and hoisting in JavaScript,
                * read [JavaScript Scoping and
                * Hoisting](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting)
                * by Ben Cherry.
                */
                latedef      : true,

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
    grunt.loadNpmTasks('grunt-contrib-uglify'); // minify js

    grunt.loadNpmTasks('grunt-html2js'); // precache angular templates

    // grunt.loadNpmTasks('grunt-folder-list'); // generate json from a folder's files
    grunt.loadNpmTasks('grunt-csv-json'); // generate json from csv
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
        'texts',
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
        'karma'
        //'protractor' //TODO
    ]);

};