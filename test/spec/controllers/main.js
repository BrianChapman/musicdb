'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('musicdbApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should watch for changes to albums.query', function() {
    expect(scope.albums).toBeDefined();
    expect(scope.albums.query).toBe('');
    expect(scope.albums.length).toBe(0);
    var query = 'Cake';
    scope.albums.query = query;
    expect(scope.albums.query).toBe(query);
  });
});