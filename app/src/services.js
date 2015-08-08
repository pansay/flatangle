/* global showdown, json */

var ngComponents = ngComponents || {};

ngComponents.converterService = function () {

    var markdownConverter = new showdown.Converter();

    this.makeHtml = function (text) {
        return markdownConverter.makeHtml(text);
    };

};


ngComponents.postsService = function ($http, $sce, converterService) {

    var postsUrl = 'content/posts/';

    //var postsList = json.posts;
    var postsList = $http.get(json.config.apiUrl).then(function (response) {
        console.log(response);
    });
    console.log(postsList);

    var cache = {}; // object of cached full posts

    var posts = []; // array of posts
    var post;
    while ( (post = postsList.shift()) ) {
        post.file = post.filename.replace('.md', '');
        post.fileParts = post.file.split('_');
        posts.push({
            'date': post.fileParts[0],
            'alias': post.fileParts[1],
            'filename': post.filename
        });
    }

    this.getPosts = function () {
        return posts;
    };

    this.getPost = function (alias) {
        if (cache.alias) {
            return cache.alias;
        }
        var filename = posts.filter(function (obj) {
            if (obj.alias === alias) {
                return true;
            }
        });

        filename = filename[0] || false;
        filename = filename.filename || false;

        if (!filename) {
            return false;
        }

        var url = postsUrl + filename;
        return $http.get(url).then(function (response) {
            cache.alias = converterService.makeHtml(response.data);
            cache.alias = $sce.trustAsHtml(cache.alias);
            return cache.alias;
        });
    };
};

// ngComponents.postsService = function ($http, $sce, converterService) {

//     var postsUrl = 'content/posts/';

//     var cache = {}; // object of cached full posts

//     var posts = []; // array of posts
//     var post;
//     while ( (post = json.posts.shift()) ) {
//         post.file = post.filename.replace('.md', '');
//         post.fileParts = post.file.split('_');
//         posts.push({
//             'date': post.fileParts[0],
//             'alias': post.fileParts[1],
//             'filename': post.filename
//         });
//     }

//     this.getPosts = function () {
//         return posts;
//     };

//     this.getPost = function (alias) {
//         if (cache.alias) {
//             return cache.alias;
//         }
//         var filename = posts.filter(function (obj) {
//             if (obj.alias === alias) {
//                 return true;
//             }
//         });

//         filename = filename[0] || false;
//         filename = filename.filename || false;

//         if (!filename) {
//             return false;
//         }

//         var url = postsUrl + filename;
//         return $http.get(url).then(function (response) {
//             cache.alias = converterService.makeHtml(response.data);
//             cache.alias = $sce.trustAsHtml(cache.alias);
//             return cache.alias;
//         });
//     };

// };