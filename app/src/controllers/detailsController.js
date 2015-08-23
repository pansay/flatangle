'use strict';

/* global angular */

(function (ng) {

    var detailsController = function ($rootScope, postDetails, texts) {
        var vm = this;
        vm.details = postDetails;
        $rootScope.title = texts.title + '|' + vm.details.title;

    };

    ng
        .module('flatAngle')
            .controller('detailsController', [
                '$rootScope',
                'postDetails',
                'texts',
                detailsController
            ]);

})(angular);