describe('ContextService', function() {
  beforeEach(module('app'));

  var $httpBackend,
    DocumentService;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    DocumentService = $injector.get('DocumentService');
    $httpBackend.whenGET('/angular/core/views/index.view.html').respond(200, '');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should add a document', function() {
    $httpBackend.expectPOST('/checkValid', {document: 'document'})
      .respond(200, { message: 'document valid'});

    $httpBackend.expectPOST('/db/database/collection', {document: 'document'})
      .respond(200, { message: 'document added'});

    DocumentService.addDocument('database', 'collection', 'document');
    expect($httpBackend.flush).not.toThrow();
  });

  it('should delete a document', function() {
    $httpBackend.expectDELETE('/db/database/collection/"testDocument"')
      .respond(200, { message: 'document deleted'});

    DocumentService.deleteDocument('database', 'collection', 'testDocument');
    expect($httpBackend.flush).not.toThrow();
  });

  it('should update a document', function() {
    $httpBackend.expectPOST('/checkValid', {document: 'document'})
      .respond(200, { message: 'document valid'});

    $httpBackend.expectPUT('/db/database/collection/"testDocument"', {document: 'document'})
      .respond(200, { message: 'document added'});

    DocumentService.updateDocument('database', 'collection', 'document', 'testDocument');
    expect($httpBackend.flush).not.toThrow();
  });
});