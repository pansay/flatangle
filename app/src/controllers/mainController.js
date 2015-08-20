'use strict';

/* global angular */

(function (ng) {

    var mainController = function ($scope, texts) {

        $scope.texts = texts;
        $scope.title = texts.title;

    };

    ng
        .module('flatAngle')
            .controller('mainController', [
                '$scope',
                'texts',
                mainController
            ]);

})(angular);