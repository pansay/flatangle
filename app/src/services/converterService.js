'use strict';

/* global angular */

(function (ng) {

    var converterService = function (showdown) {

        var markdownConverter = new showdown.Converter();

        this.markdownToHtml = function (text) {
            return markdownConverter.makeHtml(text);
        };

    };

    ng
        .module('flatAngle')
            .service('converterService', [
                'showdown',
                converterService
            ]);

})(angular);