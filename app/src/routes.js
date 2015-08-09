var ngComponents = ngComponents || {};

ngComponents.router = function ($routeProvider, appUrls) {

    var viewsFolder = 'app/templates/views/';

    $routeProvider
        .when(appUrls.posts, {
            templateUrl: viewsFolder + 'list.html',
            controller: 'listController as posts',
            resolve: {
                postsList: ['postsService', function (postsService) {
                    return postsService.getPosts();
                }]
            }
        })
        .when(appUrls.posts + '/:postAlias', {
            templateUrl: viewsFolder + 'details.html',
            controller: 'detailsController as post',
            resolve: {
                postDetails: ['postsService', '$route', '$location', function (postsService, $route, $location) {
                    return postsService.getPost($route.current.params.postAlias).catch(function (reason) {
                        console.log(reason);
                        $location.path(appUrls.home); // redirect to home if :postAlias not found
                    });
                }]
            }
        })
        .otherwise({
            redirectTo: appUrls.home
        });

};