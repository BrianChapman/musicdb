'use strict';

angular.module('musicdbApp')
	.service('coverartApi', function($http, $q) {

		var ANY_ORIGIN_BASE = 'http://anyorigin.com/dev/get?callback=JSON_CALLBACK&url=';
		var COVERART_API_BASE = 'http://coverartarchive.org';

		var api = {};

		/**
		 * Not all musicbrainz "releases" are in the cover art gallery, however,
		 * several "releases" are provided per each "release-group" (aka, album).
		 *
		 * Loop through several release and extract the mbid and attempt to get the cover art.
		 *
		 * Give up after a number of tries.
		 *
		 * @param  {[type]} album    [description]
		 * @param  {[type]} previous [description]
		 * @return {[type]}          [description]
		 */
		function findMbId(album, previous) {
			if(album && album.releases && album.releases.length > 0 && !previous) {
				return album.releases[0].id;
			}
		}

		function coverArtErrorMsg(album, error) {
			var msg = 'Error retreiving cover art for ' + album.title;
			console.log(msg + ': ' + error);
			return msg;
		}

		/**
		 * Retreives the coverart from the coverart archive API
		 *
		 * Example: http://coverartarchive.org/release/fcdfaf16-ca69-37f8-9616-9f0c5dc2c903
		 *
		 * @param  {Object} the album object from the musicbrainz api
		 * @return {json}
		 */
		api.get = function(album) {
			var mbid = findMbId(album);
			return $q(function(resolve, reject) {
				$http.jsonp(ANY_ORIGIN_BASE + COVERART_API_BASE + '/release/' + mbid).then(function(response) {
					console.log('success? ', response);
					if(response && response.data && response.data.contents && typeof(response.data.contents) === 'object') {
						var content = response.data.contents;
						console.log('coverart success: ', content);
						resolve(content);
					} else {
						reject(coverArtErrorMsg(album));
					}
				}, function(error) {
					//failure, try again.
					reject(coverArtErrorMsg(album, error));
				});

			});
		};

		return api;
	});