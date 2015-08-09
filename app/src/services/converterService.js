/* global showdown */

var ngComponents = ngComponents || {};

ngComponents.converterService = function () {

    var markdownConverter = new showdown.Converter();

    this.makeHtml = function (text) {
        return markdownConverter.makeHtml(text);
    };

};