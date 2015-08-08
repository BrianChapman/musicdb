'use strict';

angular.module('musicdbApp', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngRoute',
		'ngMaterial'
	])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/album/:albumId', {
				templateUrl: 'views/album.html',
				controller: 'AlbumCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});