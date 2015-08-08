(function appClosure (ng, showdown) {

	var modulesDependencies = [
		'ngRoute'
	];

	var router = function ($routeProvider) {

		var viewsFolder = 'app/templates/views/';

		$routeProvider
			.when('/posts', {
				templateUrl: viewsFolder + 'list.html',
				controller: 'listController'
			})
			.when('/posts/:postId', {
				templateUrl: viewsFolder + 'details.html',
				controller: 'detailsController'
			})
			.otherwise({
				redirectTo: '/posts'
			});

	};

	var listController = function () {

		// text      = '#hello, markdown!',
	 //    html      = 

	 //    console.log(html);

	};

	var detailsController = function () {

	};

	var converterService = function () {

		var converter = new showdown.Converter();
	    
	    this.makeHtml = function (text) {
	    	return converter.makeHtml(text);
	    };

	};

	ng
		.module('flatAngle', modulesDependencies)
			.config(['$routeProvider', router])
			.controller('listController', listController)
			.controller('detailsController', detailsController)
			.service('converterService', converterService);

})(angular, showdown);