'use strict';

/* global angular, texts, config, showdown */

/*

global dependencies (all here, nowhere else):
angular
config (json)
texts (json)
showdown (vendor markdown converter)

*/

(function (ng, config, texts, showdown) {

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
            .constant('showdown', showdown);

})(angular, config, texts, showdown);