'use strict';

/* global angular */

(function (ng) {

    var detailsController = function (postDetails) {

        var vm = this;
        vm.details = postDetails;

    };

    ng
        .module('flatAngle')
            .controller('detailsController', [
                'postDetails',
                detailsController
            ]);

})(angular);