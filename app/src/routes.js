'use strict';

var ngComponents = ngComponents || {};

ngComponents.router = function ($routeProvider, appUrls, homeUrl) {

    var viewsFolder = 'app/templates/views/';

    $routeProvider
        .when(appUrls.posts, {
            templateUrl: viewsFolder + 'list.html',
            controller: 'listController as posts',
            resolve: {
                postsList: ['postsService', '$location', function (postsService, $location) {
                    return postsService.getPosts().catch(function () {
                        $location.path(appUrls.home); // redirect to home if posts list not found
                    });
                }]
            }
        })
        .when(appUrls.posts + '/:postAlias', {
            templateUrl: viewsFolder + 'details.html',
            controller: 'detailsController as post',
            resolve: {
                postDetails: ['postsService', '$route', '$location', function (postsService, $route, $location) {
                    return postsService.getPost($route.current.params.postAlias).catch(function () {
                        $location.path(homeUrl); // redirect to home if :postAlias not found
                    });
                }]
            }
        })
        .otherwise({
            redirectTo: homeUrl
        });

};