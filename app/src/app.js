/* global angular, ngComponents */

(function appClosure (ng, ngComponents) {

    var modulesDependencies = [
        'ngRoute',
        'templates-main' // pre-cached templates
    ];

    var appUrls = {
        'posts': '/posts'
    };
    appUrls.home = appUrls.posts;

    ng
        .module('flatAngle', modulesDependencies)
            .constant('appUrls', appUrls)
            .config(['$routeProvider', 'appUrls', ngComponents.router])            
            .service('converterService', ngComponents.converterService)
            .service('postsService', ['$http', '$sce', '$q', 'converterService', ngComponents.postsService])
            .controller('listController', ['postsList', ngComponents.listController])
            .controller('detailsController', ['postDetails', ngComponents.detailsController]);

})(angular, ngComponents);