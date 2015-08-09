/* global json */

var ngComponents = ngComponents || {};

ngComponents.postsService = function ($http, $sce, converterService) {

    var postsUrl = 'content/posts/';

    var postsListPromise = $http.get(json.config.apiUrl).then(function (response) {

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
        return null;
    });

    var cache = {}; // object of cached full posts

    this.getPosts = function () {
        return postsListPromise;
    };

    this.getPost = function (alias) {

        // already cached
        if (cache[alias]) {
            return cache[alias];
        }

        // not cached yet: get and cache
        return postsListPromise.then(function (posts) {

            var matchedPosts = posts.filter(function (obj) {
                if (obj.alias === alias) {
                    return true;
                }
            });
            if (!matchedPosts.length) {
                return null; // alias not found
            }

            var url = matchedPosts[0].filepath;

            return $http.get(url).then(function (response) {
                var postContent = converterService.makeHtml(response.data);
                postContent = $sce.trustAsHtml(postContent);
                cache[alias] = postContent;                
                return cache[alias];
            });
            
        });
        
    };
};