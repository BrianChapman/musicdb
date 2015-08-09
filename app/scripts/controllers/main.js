'use strict';

angular.module('musicdbApp')
	.controller('MainCtrl', function($scope, brainzApi, albumsService) {

		$scope.albums = albumsService;

		//Wach the query and respond accordinly.
		$scope.$watch('albums.query', function(query) {
			if (query) {
				brainzApi.albums(query).then(function(result) {
					if (result.data && result.data['release-groups']) {
						$scope.albums.clear();
						$scope.albums.add(result.data['release-groups']);
					}
				}, function(error) {
					console.log(error);
					$scope.app.error = error;
				});
			}
		});

	});