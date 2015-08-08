/* global angular, ngComponents */

(function appClosure (ng, ngComponents) {

    var modulesDependencies = [
        'ngRoute',
        'templates-main' // pre-cached templates
    ];

    ng
        .module('flatAngle', modulesDependencies)
            .config(['$routeProvider', ngComponents.router])
            .service('converterService', ngComponents.converterService)
            .service('postsService', ['$http', '$sce', 'converterService', ngComponents.postsService])
            .controller('listController', ['postsList', ngComponents.listController])
            .controller('detailsController', ['postDetails', ngComponents.detailsController]);

})(angular, ngComponents);