describe('CollectionService:', function() {
  beforeEach(module('app'));

  var $httpBackend,
    CollectionService;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    CollectionService = $injector.get('CollectionService');
    $httpBackend.whenGET('/angular/core/views/index.view.html').respond(200, '');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should add a collection', function() {
    $httpBackend.expectPOST('/db/database', {collection: 'collection'})
      .respond(200, { message: 'collection added'});

    CollectionService.addCollection('database', 'collection');

    expect($httpBackend.flush).not.toThrow();
  });

  it('should compact a collection', function() {
    $httpBackend.expectGET('/db/database/compact/collection')
      .respond(200, { message: 'collection compacted.'});

    CollectionService.compactCollection('database', 'collection');

    expect($httpBackend.flush).not.toThrow();
  });

  it('should delete a collection', function() {
    $httpBackend.expectDELETE('/db/database/collection')
      .respond(200, { message: 'collection compacted.'});

    CollectionService.deleteCollection('database', 'collection');

    expect($httpBackend.flush).not.toThrow();
  });

  it('should rename a collection', function() {
    $httpBackend.expectPUT('/db/database/collection', {collection: 'newName'})
      .respond(200, { message: 'collection compacted.'});

    CollectionService.renameCollection('database', 'collection', 'newName');

    expect($httpBackend.flush).not.toThrow();
  });
});