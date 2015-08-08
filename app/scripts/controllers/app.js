'use strict';

/**
 * App-wide controller that is always available. Useful for displaying
 * notifications and messages.
 */
angular.module('musicdbApp')
	.controller('AppCtrl', function($scope) {
		//Setting this will trigger a message to be displayed to the end user.
		// This is encapsulated in the "app" variable to avoid conflicts as it will be inherited by all
		// sub-controllers.
		$scope.app = {
			error: null,
		};
	});