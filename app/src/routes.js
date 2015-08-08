var ngComponents = ngComponents || {};

ngComponents.router = function ($routeProvider) {

    var viewsFolder = 'app/templates/views/';

    $routeProvider
        .when('/posts', {
            templateUrl: viewsFolder + 'list.html',
            controller: 'listController as posts',
            resolve: {
                postsList: ['postsService', function (postsService) {
                    return postsService.getPosts();
                }]
            }
        })
        .when('/posts/:postAlias', {
            templateUrl: viewsFolder + 'details.html',
            controller: 'detailsController as post',
            resolve: {
                postDetails: ['postsService', '$route', function (postsService, $route) {
                    return postsService.getPost($route.current.params.postAlias);
                }]
            }
        })
        .otherwise({
            redirectTo: '/posts'
        });

};