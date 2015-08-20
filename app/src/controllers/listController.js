'use strict';

/* global angular */

(function (ng) {

    var listController = function (postsList) {

        var vm = this;
        vm.list = postsList;

    };

    ng
        .module('flatAngle')
            .controller('listController', [
                'postsList',
                listController
            ]);

})(angular);