'use strict';

/**
 * Provides an error notification in the window. Fades automatically after a certain period of time.
 *
 * @param  {msg} )     the message to display
 */
angular.module('musicdbApp').directive('errorNotification', function($timeout) {
	return {
		restrict: 'EA',
		templateUrl: '/views/error-notification-directive.html',
		scope: {
			msg: '='
		},
		link: function(scope) {

			scope.$watch('msg', function(updated) {
				if (updated) {
					scope.visible = true;
					$timeout(function() {
						if (updated === scope.msg) {
							scope.visible = false;
							$timeout(function() {
								scope.msg = null;
							}, 750);
						}
					}, 5000);
				}
			});

		}
	};
});