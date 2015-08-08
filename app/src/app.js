(function appClosure (ng, showdown) {

    var modulesDependencies = [
        'ngRoute',
        'templates-main' // cached templates
    ];

    var router = function ($routeProvider) {

        var viewsFolder = 'app/templates/views/';

        $routeProvider
            .when('/posts', {
                templateUrl: viewsFolder + 'list.html',
                controller: 'listController'
            })
            .when('/posts/:postId', {
                templateUrl: viewsFolder + 'details.html',
                controller: 'detailsController as post',
                resolve: {
                    postDetails: ['postsService', function (postsService) {
                        return postsService.getPost();
                    }]
                }
            })
            .otherwise({
                redirectTo: '/posts'
            });

    };

    var converterService = function () {

        var converter = new showdown.Converter();
        
        this.makeHtml = function (text) {
            return converter.makeHtml(text);
        };

    };

    var postsService = function ($http, $sce, converterService) {

        var postsUrl = '/content/posts/';

        var cache = false;

        this.getPost = function () { // TODO: postId etc
            return cache || $http.get(postsUrl + '2014-08-16_flat-file-cms-ftw.md').then(function (response) {
                cache = converterService.makeHtml(response.data);
                cache = $sce.trustAsHtml(cache);
                return cache;
            });
        };

    };

    var listController = function () {

        // TODO: how to get full list? use json config file?

    };

    var detailsController = function (postDetails) {

        var vm = this;
        vm.details = postDetails;

    };

    ng
        .module('flatAngle', modulesDependencies)
            .config(['$routeProvider', router])
            .service('converterService', converterService)
            .service('postsService', ['$http', '$sce', 'converterService', postsService])
            .controller('listController', listController)
            .controller('detailsController', ['postDetails', detailsController]);

})(angular, showdown);