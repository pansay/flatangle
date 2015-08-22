'use strict';

/* global angular */

(function (ng) {

    var postsService = function ($http, $q, converterService, apiUrl) {

        var cache = {}; // object of cached full posts

        var postsListPromise = $http.get(apiUrl).then(function (response) {

            if (response.data.length) {

                var posts = [], // array of posts
                    post;

                while ( (post = response.data.shift()) ) {
                    post.name = post.name.replace('.md', '');
                    post.fileParts = post.name.split('_');
                    posts.push({
                        'date': post.fileParts[0],
                        'alias': post.fileParts[1],
                        'filepath': post.download_url
                    });
                }
                return posts;
            }
            return false;
        });

        this.getPosts = function () {
            return postsListPromise.then(function (posts) {
                /* global console */
                console.log(cache);
                // TODO enrich posts with cached data
                // OR change posts to object, and just combine them...
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

                var matchedPosts = posts.filter(function (obj) {
                    if (obj.alias === alias) {
                        return true;
                    }
                });

                if (!matchedPosts.length) {
                    return $q.reject('alias not found');
                }

                var post = matchedPosts[0];
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