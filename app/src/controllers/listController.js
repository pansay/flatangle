'use strict';

/* global angular */

(function (ng) {

    var listController = function ($rootScope, postsList, texts) {

        var vm = this;
        vm.list = postsList;
        $rootScope.title = texts.title;

    };

    ng
        .module('flatAngle')
            .controller('listController', [
                '$rootScope',
                'postsList',
                'texts',
                listController
            ]);

})(angular);