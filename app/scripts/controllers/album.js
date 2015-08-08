'use strict';

angular.module('musicdbApp')
	.controller('AlbumCtrl', function($scope, $routeParams, brainzApi) {

		$scope.albumId = $routeParams.albumId;

		//retreive the album metadata
		brainzApi.album($scope.albumId).then(function(response) {
			if (response && response.data && response.data['release-groups'].length > 0) {
				$scope.album = response.data['release-groups'][0];
			}
		}, function(error) {
			console.log(error);
			$scope.app.error = 'An error occured while retreiving album.';
		});

		//retreive the recording (tracks) metadata
		brainzApi.recording($scope.albumId).then(function(response) {
			if (response && response.data && response.data.recordings) {
				$scope.recordings = response.data.recordings;
			}
		}, function(error) {
			console.log(error);
			$scope.app.error = 'An error occured while retreiving album recordings.';
		});

		/**
		 * Converts milliseconds to an object with the corresponding
		 * hours, minutes, seconds, and milliseconds.
		 *
		 * TODO: Move logic to a utility function or library if it is required
		 * in another location.
		 *
		 * @param  {int} duration in milliseconds
		 * @return {Object}  with hours, minutes, seconds, and milliseconds.
		 */
		function msToTime(duration) {
			var milliseconds = parseInt((duration % 1000) / 100),
				seconds = parseInt((duration / 1000) % 60),
				minutes = parseInt((duration / (1000 * 60)) % 60),
				hours = parseInt((duration / (1000 * 60 * 60)) % 24);

			hours = (hours < 10) ? '0' + hours : hours;
			minutes = (minutes < 10) ? '0' + minutes : minutes;
			seconds = (seconds < 10) ? '0' + seconds : seconds;

			return {
				hours: hours,
				minutes: minutes,
				seconds: seconds,
				milliseconds: milliseconds,
			};
		}

		/**
		 * Formats the duration into a hour:minute:second format.
		 *
		 * @param  {[type]} length [description]
		 * @return {[type]}        [description]
		 */
		$scope.formatLength = function(length) {
			//length comes in as milliseconds, convert to minutes:seconds.
			var time = msToTime(length);
			var formatted = '';
			['hours', 'minutes', 'seconds'].forEach(function(key) {
				var value = time[key];
				if (value > 0) {
					formatted = formatted + value + ':';
				}
			});
			if (formatted.length > 0) {
				formatted = formatted.substr(0, formatted.length - 1);
			}
			return formatted;
		};

	});