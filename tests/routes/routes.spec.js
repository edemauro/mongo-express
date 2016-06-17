describe('routes', function() {
  beforeEach(module('app'));
  var deferred,
    $rootScope,
    $state,
    $injector,
    $stateParams,
    ContextService,
    $httpBackend;

  beforeEach(inject(function($q, _$rootScope_, _$state_, _$injector_, _$stateParams_, _ContextService_) {
    deferred = $q.defer();
    $rootScope = _$rootScope_;
    $state = _$state_;
    $injector = _$injector_;
    $stateParams = _$stateParams_;
    ContextService = _ContextService_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('/angular/core/views/index.view.html').respond(200, '');
  }));

  describe('index', function() {
    it('should respond to URL', function() {
      expect($state.href('index')).toEqual('#/');
    });
  });

  describe('database', function() {
    it('should respond to URL', function() {
      expect($state.href('database', { database: 'test' })).toEqual('#/db/test');
    });

    it('should resolve data', function() {
      spyOn(ContextService, 'getDatabaseContext').and.returnValue(deferred.promise);
      $state.go('database');
      $rootScope.$digest();
      expect(ContextService.getDatabaseContext).toHaveBeenCalled();
    });
  });

  describe('collection', function() {
    it('should respond to URL', function() {
      expect($state.href('collection', { database: 'testdb', collection: 'testcol' })).toEqual('#/db/testdb/testcol');
    });

    it('should resolve data', function() {
      spyOn(ContextService, 'getCollectionContext').and.returnValue(deferred.promise);
      $state.go('collection');
      $rootScope.$digest();
      expect(ContextService.getCollectionContext).toHaveBeenCalled();
    });
  });

  describe('gridfs', function() {
    it('should respond to URL', function() {
      expect($state.href('gridfs', { database: 'testdb', bucket: 'testbucket' })).toEqual('#/db/testdb/gridFS/testbucket');
    });

    it('should resolve data', function() {
      spyOn(ContextService, 'getGridfsContext').and.returnValue(deferred.promise);
      $state.go('gridfs');
      $rootScope.$digest();
      expect(ContextService.getGridfsContext).toHaveBeenCalled();
    });
  });

  describe('document', function() {
    it('should respond to URL', function() {
      expect($state.href('document', { database: 'testdb', collection: 'testcol', document: 'testdoc' })).toEqual('#/db/testdb/testcol/testdoc');
    });
    
    it('should resolve data', function() {
      spyOn(ContextService, 'getDocumentContext').and.returnValue(deferred.promise);
      $state.go('document');
      $rootScope.$digest();
      expect(ContextService.getDocumentContext).toHaveBeenCalled();
    });
  });
});