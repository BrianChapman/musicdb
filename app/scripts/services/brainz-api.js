'use strict';

/**
 * Service providing access to the Music Brainz API.
 */
angular.module('musicdbApp')
	.service('brainzApi', function($http) {

		var API_BASE = 'http://musicbrainz.org/ws/2';

		var api = {};

		function makeGetRequest(relativeUrl, query) {
			return $http({
				method: 'GET',
				url: API_BASE + relativeUrl,
				params: {
					fmt: 'json',
					query: query
				}
			});
		}

		/**
		 * Retreives a list of "release-groups" from the MusicBrainz API
		 *
		 * Example: http://musicbrainz.org/ws/2/release-group/?query=(artist:"Cake" OR title:"Cake") AND primarytype:"album"&fmt=json
		 *
		 * @param  {String} query The query, which will be matched against the artist and album title
		 * @return {json}	See https://wiki.musicbrainz.org/Development/XML_Web_Service/Version_2/Search
		 */
		api.albums = function(query) {
			var formattedQuery = '(artist:"' + query + '" OR title:"' + query + '") AND primarytype:"album"';
			return makeGetRequest('/release-group', formattedQuery);
		};

		/**
		 * Retreives a list of "albums" from the MusicBrainz API
		 *
		 * Example: http://musicbrainz.org/ws/2/release/?query=rgid:3bd5a388-774f-3b47-b3f8-5b3463cbcb13&fmt=json
		 *
		 * @param  {String} albumId the id of the album (release-group.id)
		 * @return {json}	See https://wiki.musicbrainz.org/Development/XML_Web_Service/Version_2/Search
		 */
		api.album = function(albumId) {
			var formattedQuery = 'rgid:' + albumId;
			return makeGetRequest('/release-group', formattedQuery);
		};

		/**
		 * Retreives a list of "recordings" from the MusicBrainz API
		 *
		 * Example: http://musicbrainz.org/ws/2/recording/?query=rgid:3bd5a388-774f-3b47-b3f8-5b3463cbcb13&fmt=json
		 *
		 * @param  {String} albumId the id of the album (release-group.id)
		 * @return {json}	See https://wiki.musicbrainz.org/Development/XML_Web_Service/Version_2/Search
		 */
		api.recording = function(albumId) {
			var formattedQuery = 'rgid:' + albumId;
			return makeGetRequest('/recording', formattedQuery);
		};

		return api;
	});