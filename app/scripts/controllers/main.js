'use strict';

angular.module('musicdbApp')
	.controller('MainCtrl', function($scope, brainzApi) {

		//Wach the query and respond accordinly.
		$scope.$watch('query', function(query) {
			if (query) {
				brainzApi.albums(query).then(function(result) {
					if (result.data && result.data['release-groups']) {
						$scope.albums = result.data['release-groups'];
					}
				}, function(error) {
					$scope.error = error;
				});
			}
		});

	});