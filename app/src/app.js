'use strict';

/* global angular, ngComponents, texts, config, showdown */

/*

global dependencies (all here, nowhere else):
angular
config (json)
texts (json)
showdown (vendor markdown converter)

*/

(function appClosure (ng, ngComponents, config, texts, showdown) {

    var modulesDependencies = [
        'ngRoute',
        'templates-main' // pre-cached templates
    ];

    ng
        .module('flatAngle', modulesDependencies)
            .constant('texts', texts[config.config.lang])
            .constant('appUrls', config.config.appUrls)
            .constant('homeUrl', config.config.appUrls[config.config.home])
            .constant('apiUrl', config.config.apiUrl)
            .constant('showdown', showdown)
            .config(['$routeProvider', 'appUrls', 'homeUrl', ngComponents.router])            
            .service('converterService', ['showdown', ngComponents.converterService])
            .service('postsService', ['$http', '$sce', '$q', 'converterService', 'apiUrl', ngComponents.postsService])
            .controller('mainController', ['$scope', 'texts', ngComponents.mainController])           
            .controller('listController', ['postsList', ngComponents.listController])
            .controller('detailsController', ['postDetails', ngComponents.detailsController]);

})(angular, ngComponents, config, texts, showdown);