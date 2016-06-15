describe('CollectionController:', function() {
  beforeEach(module('app'));

  var scope, 
    CollectionController,
    ContextService,
    $stateParams,
    $uibModal,
    $state,
    DocumentService;

  beforeEach(function() {

    inject(function($rootScope, $controller, _$uibModal_, _CollectionService_, _ContextService_, _$stateParams_, _$state_, _DocumentService_) {
      ContextService = _ContextService_;
      DocumentService =_DocumentService_;
      $stateParams = _$stateParams_;
      CollectionService = _CollectionService_;
      $state = _$state_;
      $uibModal = _$uibModal_;
      scope = $rootScope.$new();

      spyOn(ContextService, 'addAlert');

      ContextService.context = mockData.getMockCollection();

      CollectionController = $controller('CollectionController', {
        $scope: scope,
        CollectionService: CollectionService,
        ContextService: ContextService,
        DocumentService: DocumentService,
        $stateParams: $stateParams,
        $uibModal: $uibModal,
        $state: $state
      });
    });
  });

  it('should be registered', function() {
    expect(CollectionController).toBeDefined();
  });

  describe('compact', function() {
    var deferred;

    beforeEach(inject(function($q) {
      deferred = $q.defer();
      spyOn(CollectionService, 'compactCollection').and.returnValue(deferred.promise);
      CollectionController.compact();
    }))

    it('should call compact on CollectionService', function() {
      expect(CollectionService.compactCollection).toHaveBeenCalled();
    });

    it('should add an alert on success', function() {
      deferred.resolve();
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
    });
  });

  describe('deleteDocument', function() {
    var deferred;

    beforeEach(inject(function($q) {
      deferred = $q.defer();
      spyOn(DocumentService, 'deleteDocument').and.returnValue(deferred.promise);
      spyOn(ContextService, 'getCollectionContext').and.returnValue(deferred.promise);
      CollectionController.deleteDocument();
    }))

    it('should call deleteDocument on DocumentService', function() {
      expect(DocumentService.deleteDocument).toHaveBeenCalled();
    });

    it('should add an alert and update context on success', function() {
      var response = { message: 'document deleted' };
      deferred.resolve(response);
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
      expect(ContextService.getCollectionContext).toHaveBeenCalled();
    });

    it('should add an alert on failure', function() {
      var response = { message: 'document was NOT deleted' };
      deferred.reject(response);
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
    });
  });

  describe('loadDocument', function() {
    it('should load a specific document', function() {
      spyOn($state, 'go');
      CollectionController.loadDocument();
      expect($state.go).toHaveBeenCalled();
    });
  });

  describe('renameCollection', function() {
    var deferred;

    beforeEach(inject(function($q) {
      deferred = $q.defer();
      spyOn(CollectionService, 'renameCollection').and.returnValue(deferred.promise);
      spyOn($state, 'go');
      CollectionController.renameCollection();
    }))

    it('should call renameCollection on CollectionService', function() {
      expect(CollectionService.renameCollection).toHaveBeenCalled();
    });

    it('should add an alert and change state', function() {
      var response = { message: 'document renamed' };
      deferred.resolve(response);
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalled();
    });

    it('should add an alert on failure', function() {
      var response = { message: 'document was NOT renamed' };
      deferred.reject(response);
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
    });
  });
});