'use strict';

describe('Controller: MainCtrl', function() {

	// load the controller's module
	beforeEach(module('musicdbApp'));

	var AlbumCtrl,
		scope;
	var albumId = '1234';
	var deferredAlbum;
	var deferredRecording;
	var albumResponse = {
		data: {
			'release-groups': [{
				title: 'Album1'
			}, {
				title: 'Album2'
			}]
		}
	};
	var recordingResponse = {
		data: {
			recordings: [1,2]
		}
	};

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope, $q, brainzApi) {

		scope = $rootScope.$new();
		scope.app = {
			error: ''
		};

		deferredAlbum = $q.defer();
		spyOn(brainzApi, 'album').and.returnValue(deferredAlbum.promise);
		deferredRecording = $q.defer();
		spyOn(brainzApi, 'recording').and.returnValue(deferredRecording.promise);

		AlbumCtrl = $controller('AlbumCtrl', {
			$scope: scope,
			$routeParams: {
				albumId: albumId
			},
			brainzApi: brainzApi
		});

	}));

	// it('should set the albumId', function() {
	// 	expect(scope.albumId).toBe(albumId);
	// });

	it('should retreive the album using the albumId', function() {
		deferredAlbum.resolve(albumResponse);
		scope.$apply();
		expect(scope.album).toBeDefined();
		expect(scope.app.error.length).toBe(0);
		expect(scope.album.title).toBe(albumResponse.data['release-groups'][0].title);
	});

	it('should retreive the recording using the albumId', function() {
		deferredRecording.resolve(recordingResponse);
		scope.$apply();
		expect(scope.app.error.length).toBe(0);
		expect(scope.recordings).toBeDefined();
		expect(scope.recordings.length).toBeGreaterThan(0);
	});

	it('should handle a failed album response', function(done) {
		deferredAlbum.reject('an error occured');
		scope.$apply();
		expect(scope.app.error.length).toBeGreaterThan(0);
		done();
	});

	it('should handle a failed recording response', function(done) {
		deferredRecording.reject('an error occured');
		scope.$apply();
		expect(scope.app.error.length).toBeGreaterThan(0);
		done();
	});

	it('should convert ms into a fomatted time', function(done) {
		var duration = 241000;
		var formatted = scope.formatLength(duration);
		expect(formatted).toBe('04:01');
		done();
	});

});