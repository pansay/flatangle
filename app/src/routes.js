'use strict';

/* global angular */

(function (ng) {

    var router = function ($routeProvider, appUrls, homeUrl) {

        var viewsFolder = 'app/templates/views/';

        $routeProvider
            .when(appUrls.posts, {
                templateUrl: viewsFolder + 'list.html',
                controller: 'listController as posts',
                resolve: {
                    postsList: ['postsService', function (postsService) {
                        return postsService.getPosts().catch(function () {
                            return false; // can't redirect, this is the default page
                        });
                    }]
                }
            })
            .when(appUrls.posts + '/:postAlias', {
                templateUrl: viewsFolder + 'details.html',
                controller: 'detailsController as post',
                resolve: {
                    postDetails: ['postsService', '$route', '$location', '$q', function (postsService, $route, $location, $q) {
                        return postsService.getPost($route.current.params.postAlias).catch(function (reason) {
                            $location.path(homeUrl); // redirect to home if :postAlias not found
                            //throw $route.current.params.postAlias + ': ' + reason;
                            return $q.reject(reason);
                        });
                    }]
                }
            })
            .otherwise({
                redirectTo: homeUrl
            });

    };

    ng
        .module('flatAngle')
            .config([
                '$routeProvider',
                'appUrls',
                'homeUrl',
                router
            ]);

})(angular);