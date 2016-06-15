describe('CollectionModalController:', function() {
  beforeEach(module('app'));

  var scope, 
    CollectionModalController,
    CollectionService,
    db

  beforeEach(function() {

    inject(function($rootScope, $controller, _CollectionService_) {
      CollectionService = _CollectionService_;
      scope = $rootScope.$new();
      modalInstance = {
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss')
      };
      db = 'db';
      collection = 'collection';

      CollectionModalController = $controller('CollectionModalController', {
        $scope: scope,
        CollectionService: CollectionService,
        $uibModalInstance: modalInstance,
        db: db,
        collection: collection
      });
    });
  });

  it('should be registered', function() {
    expect(CollectionModalController).toBeDefined();
  });

  describe('deleteCollection', function() {
    var deferred
    beforeEach(inject(function($q) {
      deferred = $q.defer();
      spyOn(CollectionService, 'deleteCollection').and.returnValue(deferred.promise);
      CollectionModalController.collectionConfirm = 'collection';
      CollectionModalController.deleteCollection();
    }));

    it('should call deleteCollection on CollectionService', function() {
      expect(CollectionService.deleteCollection).toHaveBeenCalled();
    });

    it('should close the modal on success', function() {
      var response = {message: 'Collection deleted'};
      deferred.resolve(response);
      scope.$digest();
      expect(modalInstance.close).toHaveBeenCalledWith(response);
    });

    it('should close the modal on failure', function() {
      var response = {message: 'Collection deleted'};
      deferred.reject(response);
      scope.$digest();
      expect(modalInstance.close).toHaveBeenCalledWith(response);
    })
  });
});