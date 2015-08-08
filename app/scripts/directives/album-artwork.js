'use strict';

/**
 * Displays the album artwork image
 *
 * @param  {album} )     the album to display
 */
angular.module('musicdbApp').directive('albumArtwork', function(coverartApi) {

	var placeholderArtworkUrl = '/images/album/placeholder-artwork.jpg';

	return {
		restrict: 'EA',
		templateUrl: '/views/album-artwork-directive.html',
		scope: {
			album: '='
		},
		link: function($scope) {
			$scope.url = placeholderArtworkUrl;

			function getArtwork() {
				coverartApi.get($scope.album).then(function(coverArtwork) {
					if (coverArtwork.images.length > 0) {
						$scope.url = coverArtwork.images[0].image;
					}
				}, function(error) {
					console.log('Error retreiving cover art: ', error);
				});
			}

			$scope.$watch('album', function(album) {
				if(album) {
					getArtwork();
				}
			});
		}
	};
});