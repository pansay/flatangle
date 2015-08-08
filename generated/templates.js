angular.module('templates-main', ['app/templates/views/details.html', 'app/templates/views/list.html']);

angular.module("app/templates/views/details.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/templates/views/details.html",
    "<a href=\"#/posts\">back to posts list</a><div class=\"post-content\" data-ng-show=\"post.details\" data-ng-bind-html=\"post.details\"></div><div data-ng-hide=\"post.details\">no post here</div>");
}]);

angular.module("app/templates/views/list.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/templates/views/list.html",
    "<h1>FlatAngle</h1><p>Posts list:</p><ul data-ng-show=\"posts.list\"><li data-ng-repeat=\"post in posts.list\"><a href=\"#\" data-ng-href=\"#/posts/{{post.alias}}\">{{post.date}} - {{post.alias}}</a></li></ul><p data-ng-hide=\"posts.list\">no posts yet</p>");
}]);
