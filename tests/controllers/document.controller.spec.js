describe('DatabaseController:', function() {
  beforeEach(module('app'));

  var scope, 
    DatabaseController,
    ContextService,
    $stateParams,
    $uibModal,
    CollectionService,
    fake;

  beforeEach(inject(function($q) {
    fake = new FakeModal($q);
  }));

  beforeEach(function() {

    inject(function($rootScope, $controller, _CollectionService_, _ContextService_, _$stateParams_, _$uibModal_) {
      ContextService = _ContextService_;
      $stateParams = _$stateParams_;
      CollectionService = _CollectionService_;
      $uibModal = _$uibModal_;
      scope = $rootScope.$new();

      spyOn(ContextService, 'addAlert');

      ContextService.context = mockData.getMockDatabase();

      DatabaseController = $controller('DatabaseController', {
        $scope: scope,
        CollectionService: CollectionService,
        ContextService: ContextService,
        $uibModal: $uibModal,
        $stateParams: $stateParams
      });
    });
  });

  it('should be registered', function() {
    expect(DatabaseController).toBeDefined();
  });

  describe('addCollection', function() {
    var deferred;

    beforeEach(inject(function($q) {
      deferred = $q.defer();
      spyOn(CollectionService, 'addCollection').and.returnValue(deferred.promise);
      spyOn(ContextService, 'getDatabaseContext').and.returnValue(deferred.promise);
      DatabaseController.addCollection();
    }));

    it('should call addCollection on CollectionService', function(){
      expect(CollectionService.addCollection).toHaveBeenCalled();
    });

    it('should add an alert and update context on success', function() {
      deferred.resolve({message: 'Collection created.'});
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
      expect(ContextService.getDatabaseContext).toHaveBeenCalled();
    });

    it('should add an alert on failure', function() {
      deferred.reject({message: 'Collection not created.'});
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
    });
  });

  describe('deleteCollection', function() {
    var deferred;

    beforeEach(inject(function($q) {
      deferred = $q.defer();
      spyOn($uibModal, 'open').and.returnValue(fake);
      spyOn(ContextService, 'getDatabaseContext').and.returnValue(deferred.promise);
      DatabaseController.deleteCollection();
    }));

    it('should open a new modal', function() {
      expect($uibModal.open).toHaveBeenCalled();
    });

    it('should add a new alert on success', function() {
      fake.close({ type: 'success', message: 'Collection deleted' });
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
      expect(ContextService.getDatabaseContext).toHaveBeenCalled();
    });
  })
});