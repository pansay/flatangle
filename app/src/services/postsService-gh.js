'use strict';

/* global angular */

(function (ng) {

    var postsService = function ($http, $q, converterService, apiUrl) {

        var cache = {}; // object of cached full posts

        var postsListPromise = $http.get(apiUrl).then(function (response) {

            if (response.data.length) {

                var posts = {}, // object of posts
                    post = {},
                    tempPost = {};

                while ( (tempPost = response.data.shift()) ) {
                    tempPost.fileName = tempPost.name.replace('.md', '');
                    tempPost.fileParts = tempPost.fileName.split('_');
                    post = {};
                    post.date = tempPost.fileParts[0];
                    post.alias = tempPost.fileParts[1];
                    post.filepath = tempPost.download_url;

                    posts[post.alias] = post;
                }
                return posts;
            }
            return false;
        });

        this.getPosts = function () {
            return postsListPromise.then(function (posts) {
                angular.extend(posts, cache);
                return posts;
            });
        };

        this.getPost = function (alias) {

            var deferred = $q.defer();

            // already cached
            if (cache[alias]) {
                deferred.resolve(cache[alias]);
                return deferred.promise;
            }

            // not cached yet: get and cache
            return postsListPromise.then(function (posts) {

                var post = posts[alias] || false;

                if (!post) {
                    return $q.reject('alias not found');
                }

                var url = post.filepath;

                return $http.get(url).then(function (response) {
                    var postContent = converterService.markdownToHtml(response.data);
                    var firstLine = converterService.firstLine(postContent);
                    cache[alias] = post;
                    cache[alias].title = converterService.htmlToPlainText(firstLine);
                    cache[alias].content = converterService.trustAsHtml(postContent);
                    return cache[alias];
                });

            });

        };
    };

    ng
        .module('flatAngle')
            .service('postsService', [
                '$http',
                '$q',
                'converterService',
                'apiUrl', postsService
            ]);

})(angular);