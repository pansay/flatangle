'use strict';

var ngComponents = ngComponents || {};

ngComponents.converterService = function (showdown) {

    var markdownConverter = new showdown.Converter();

    this.markdownToHtml = function (text) {
        return markdownConverter.makeHtml(text);
    };

};