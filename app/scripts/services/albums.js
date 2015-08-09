'use strict';

/**
 * Service providing a singleton that stores the result of the last search.
 * Used to populate the view when the user clicks "back".
 */
angular.module('musicdbApp')
	.service('albumsService', function() {

		var service = [];

		service.query = '';

		service.clear = function() {
			service.length = 0;
		};

		service.add = function(albums) {
			albums.forEach(function(album) {
				service.push(album);
			});
		};

		return service;
	});