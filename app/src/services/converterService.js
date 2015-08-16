'use strict';

var ngComponents = ngComponents || {};

ngComponents.converterService = function (showdown) {

    var markdownConverter = new showdown.Converter();

    this.makeHtml = function (text) {
        return markdownConverter.makeHtml(text);
    };

};