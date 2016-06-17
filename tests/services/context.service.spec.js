describe('ContextService', function() {
  beforeEach(module('app'));

  var $httpBackend,
    ContextService;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    ContextService = $injector.get('ContextService');
    $httpBackend.whenGET('/angular/core/views/index.view.html').respond(200, '');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('alerts and templates', function() {
    var alert;
    beforeEach(function() {
      $httpBackend.flush();
      alert = {type: 'success', message: 'Alert!'};
    });

    it('should be able to add an alert', function() {
      ContextService.addAlert(alert);
      expect(ContextService.alerts).toContain(alert);
    });

    it('should be able to remove an alert', function() {
      ContextService.alerts.push(alert);
      ContextService.closeAlert(0);
      expect(ContextService.alerts).not.toContain(alert);
    });


    it('should set the active template', function() {
      ContextService.setActiveTemplate(1);
      expect(ContextService.getActiveTemplate()).toEqual({ url: 'angular/core/views/partials/_document.header.html' });
    });

    it('should get the active template', function() {
      expect(ContextService.getActiveTemplate()).toEqual({ url: 'angular/core/views/partials/_index.header.html' });
    });
  });

  it('should get the index context', function() {
    $httpBackend.whenGET('/api/index')
      .respond(mockData.getMockDatabase());

    ContextService.getIndex();
    $httpBackend.flush();
    expect(ContextService.context).toEqual(mockData.getMockDatabase());
  });

  it('should get the gridfs context', function() {
    $httpBackend.whenGET('/db/database/gridFS/bucket')
      .respond(mockData.getMockGridfs());

    ContextService.getGridfsContext('database', 'bucket');
    $httpBackend.flush();
    expect(ContextService.context).toEqual(mockData.getMockGridfs());
  });

  it('should get the database context', function() {
    $httpBackend.whenGET('/db/testDatabase')
      .respond(mockData.getMockDatabase());

    ContextService.getDatabaseContext('testDatabase');
    $httpBackend.flush();
    expect(ContextService.context).toEqual(mockData.getMockDatabase());
  });

  it('should get document context', function() {
    $httpBackend.whenGET('/db/testDatabase/collection/"documentId"')
      .respond(mockData.getMockDocument());

    ContextService.getDocumentContext('testDatabase', 'collection', 'documentId');
    $httpBackend.flush();
    expect(ContextService.context).toEqual(mockData.getMockDocument());
  });

  it('should get collection context', function() {
    $httpBackend.whenGET('/db/testDatabase/collection')
      .respond(mockData.getMockCollection());

    ContextService.getCollectionContext('testDatabase', 'collection');
    $httpBackend.flush();
    expect(ContextService.context).toEqual(mockData.getMockCollection());
  });
});