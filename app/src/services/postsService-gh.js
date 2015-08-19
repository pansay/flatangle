'use strict';

var ngComponents = ngComponents || {};

ngComponents.postsService = function ($http, $sce, $q, converterService, apiUrl) {

    //var postsUrl = 'content/posts/';

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

    var cache = {}; // object of cached full posts

    this.getPosts = function () {
        return postsListPromise;
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

            var url = matchedPosts[0].filepath;

            return $http.get(url).then(function (response) {
                var postContent = converterService.markdownToHtml(response.data);
                postContent = $sce.trustAsHtml(postContent);
                cache[alias] = postContent;
                return cache[alias];
            });

        });

    };
};