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
                    var promise = postsService.getPost($route.current.params.postAlias);
                    if (!promise) { // :postAlias not found
                        $location.path(appUrls.home); // redirect to home
                        return null; // angular weird behavior: 
                        // the template is still parsed and null is the only value that doesn't trigger errors
                    }
                    return promise;
                }]
            }
        })
        .otherwise({
            redirectTo: appUrls.home
        });

};