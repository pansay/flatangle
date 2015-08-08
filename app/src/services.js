/* global showdown */

var ngComponents = ngComponents || {};

ngComponents.converterService = function () {

    var markdownConverter = new showdown.Converter();
    
    this.makeHtml = function (text) {
        return markdownConverter.makeHtml(text);
    };

};

ngComponents.postsService = function ($http, $sce, converterService) {

    var postsUrl = '/content/posts/';

    var cache = {};

    this.getPost = function (postId) {
        var url = postsUrl + postId + '.md';
        return cache.postId || $http.get(url).then(function (response) {
            cache.postId = converterService.makeHtml(response.data);
            cache.postId = $sce.trustAsHtml(cache.postId);
            return cache.postId;
        });
    };

};