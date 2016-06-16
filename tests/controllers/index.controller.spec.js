describe('IndexController:', function() {
  beforeEach(module('app'));

  var scope, 
    IndexController,
    ContextService,
    $uibModal,
    DatabaseService,
    $httpBackend;

  beforeEach(inject(function($q) {
    fake = new FakeModal($q);
  }));

  beforeEach(function() {

    inject(function(_$httpBackend_, $rootScope, $controller, _ContextService_, _$uibModal_, _DatabaseService_) {
      ContextService = _ContextService_;
      DatabaseService = _DatabaseService_;
      $uibModal = _$uibModal_;
      scope = $rootScope.$new();
      $httpBackend = _$httpBackend_;

      spyOn(ContextService, 'addAlert');

      ContextService.context = mockData.getMockCollection();

      IndexController = $controller('IndexController', {
        $scope: scope,
        DatabaseService: DatabaseService,
        ContextService: ContextService,
        $uibModal: $uibModal
      });
    });

    $httpBackend.whenGET("/api/index").respond(mockData.getMockCollection());
  });

  it('should be registered', function() {
    expect(IndexController).toBeDefined();
  });

  describe('addDb', function() {
    var deferred;

    beforeEach(inject(function($q) {
      deferred = $q.defer();
      spyOn(DatabaseService, 'addDatabase').and.returnValue(deferred.promise);
      spyOn(ContextService, 'getIndex').and.returnValue(deferred.promise);
      IndexController.database = 'red';
      IndexController.addDb();
    }));

    it('should call addDatabase on DatabaseService', function() {
      expect(DatabaseService.addDatabase).toHaveBeenCalled();
    });

    it('should add an alert and update context on success', function() {
      deferred.resolve({message: 'Database added!'});
      scope.$digest();
      expect(IndexController.database).toEqual("");
      expect(ContextService.addAlert).toHaveBeenCalled();
      expect(ContextService.getIndex).toHaveBeenCalled();
    });

    it('should add an alert on failure', function() {
      deferred.reject({message: 'Database NOT added!'});
      scope.$digest();
      expect(IndexController.database).toEqual("red");
      expect(ContextService.addAlert).toHaveBeenCalled();
    });
  });

  describe('deleteDb', function() {
    var deferred;

    beforeEach(inject(function($q) {
      deferred = $q.defer();
      spyOn($uibModal, 'open').and.returnValue(fake);
      IndexController.deleteDb();
    }));

    it('should open a new modal', function() {
      expect($uibModal.open).toHaveBeenCalled();
    });

    it('should add a new alert on success', function() {
      fake.close({ type: 'success', message: 'Database deleted' });
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
    });
  });
});