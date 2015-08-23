'use strict';

/* global angular */

(function (ng) {

    var converterService = function (showdown, $sce) {

        var markdownConverter = new showdown.Converter();

        this.htmlToPlainText = function (html) {
            return html ? String(html).replace(/<[^>]+>/gm, '') : '';
        };

        this.firstLine = function (string) {
            return string.split('\n', 1)[0];
        };

        this.markdownToHtml = function (text) {
            return markdownConverter.makeHtml(text);
        };

        this.trustAsHtml = function (html) {
            return $sce.trustAsHtml(html);
        };

    };

    ng
        .module('flatAngle')
            .service('converterService', [
                'showdown',
                '$sce',
                converterService
            ]);

})(angular);