describe('DatabaseService', function() {
  beforeEach(module('app'));

  var $httpBackend,
    DatabaseService;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    DatabaseService = $injector.get('DatabaseService');
    $httpBackend.whenGET('/angular/core/views/index.view.html').respond(200, '');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should add a database', function() {
    $httpBackend.expectPOST('/', {database: 'database'})
      .respond(200, { message: 'database added'});

    DatabaseService.addDatabase('database');

    expect($httpBackend.flush).not.toThrow();
  });

  it('should delete a database', function() {
    $httpBackend.expectDELETE('/database')
      .respond(200, { message: 'database deleted'});

    DatabaseService.deleteDatabase('database');

    expect($httpBackend.flush).not.toThrow();
  });
});