describe('DatabaseModalController:', function() {
  beforeEach(module('app'));

  var scope, 
    ModalController,
    DatabaseService,
    db

  beforeEach(function() {

    inject(function($rootScope, $controller, _DatabaseService_) {
      DatabaseService = _DatabaseService_;
      scope = $rootScope.$new();
      modalInstance = {
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss')
      };
      db = 'db';

      ModalController = $controller('ModalController', {
        $scope: scope,
        DatabaseService: DatabaseService,
        $uibModalInstance: modalInstance,
        db: db
      });
    });
  });

  it('should be registered', function() {
    expect(ModalController).toBeDefined();
  });

  describe('deleteDb', function() {
    var deferred
    beforeEach(inject(function($q) {
      deferred = $q.defer();
      spyOn(DatabaseService, 'deleteDatabase').and.returnValue(deferred.promise);
      ModalController.dbConfirm = 'db';
      ModalController.deleteDb();
    }));

    it('should call deleteDatabase on DatabaseService', function() {
      expect(DatabaseService.deleteDatabase).toHaveBeenCalled();
    });

    it('should close the modal on success', function() {
      var response = {message: 'Database deleted'};
      deferred.resolve(response);
      scope.$digest();
      expect(modalInstance.close).toHaveBeenCalledWith(response);
    });

    it('should close the modal on failure', function() {
      var response = {message: 'Database deleted'};
      deferred.reject(response);
      scope.$digest();
      expect(modalInstance.close).toHaveBeenCalledWith(response);
    })
  });
});