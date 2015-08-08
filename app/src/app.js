/* global angular, showdown */

(function appClosure (ng, showdown) {

    var modulesDependencies = [
        'ngRoute',
        'templates-main' // pre-cached templates
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
                        var postId = '2014-08-16_flat-file-cms-ftw'; // TODO from param
                        return postsService.getPost(postId);
                    }]
                }
            })
            .otherwise({
                redirectTo: '/posts'
            });

    };

    var converterService = function () {

        var markdownConverter = new showdown.Converter();
        
        this.makeHtml = function (text) {
            return markdownConverter.makeHtml(text);
        };

    };

    var postsService = function ($http, $sce, converterService) {

        var postsUrl = '/content/posts/';

        var cache = {};

        this.getPost = function (postId) {
            var url = postsUrl + postId + '.md';
            return cache.postId || $http.get(url).then(function (response) {
                cache.postId = converterService.makeHtml(response.data);
                cache.postId = $sce.trustAsHtml(cache.postId);
                return cache.postId;
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