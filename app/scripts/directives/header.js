'use strict';

/**
 * Provides a site-wide header.
 *
 * @param  {showSearch} )     toggle the search box
 */
angular.module('musicdbApp').directive('appHeader', function() {

	return {
		restrict: 'EA',
		templateUrl: '/views/_header.html',
		scope: {
			query: '=ngModel',
			showSearch: '='
		},
		link: function() {

		}
	};
});