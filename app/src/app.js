/* global angular, ngComponents, texts, config */

(function appClosure (ng, ngComponents, config, texts) {

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
            .constant('texts', texts[config.config.lang])
            .constant('appUrls', appUrls)
            .config(['$routeProvider', 'appUrls', ngComponents.router])            
            .service('converterService', ngComponents.converterService)
            .service('postsService', ['$http', '$sce', '$q', 'converterService', ngComponents.postsService])
            .controller('mainController', ['$scope', 'texts', ngComponents.mainController])           
            .controller('listController', ['postsList', ngComponents.listController])
            .controller('detailsController', ['postDetails', ngComponents.detailsController]);

})(angular, ngComponents, config, texts);