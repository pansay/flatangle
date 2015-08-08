var ngComponents = ngComponents || {};

ngComponents.router = function ($routeProvider) {

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