describe('DatabaseModalController:', function() {
  beforeEach(module('app'));

  var scope, 
    DocumentModalController,
    DocumentService,
    db,
    collection;

  beforeEach(function() {

    inject(function($rootScope, $controller, _DocumentService_) {
      DocumentService = _DocumentService_;
      scope = $rootScope.$new();
      modalInstance = {
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss')
      };
      db = 'db';
      collection = 'collection';

      DocumentModalController = $controller('DocumentModalController', {
        $scope: scope,
        DocumentService: DocumentService,
        $uibModalInstance: modalInstance,
        db: db,
        collection: collection
      });
    });
  });

  it('should be registered', function() {
    expect(DocumentModalController).toBeDefined();
  });

  describe('addDocument', function() {
    var deferred
    beforeEach(inject(function($q) {
      deferred = $q.defer();
      spyOn(DocumentService, 'addDocument').and.returnValue(deferred.promise);
      DocumentModalController.addDocument();
    }));

    it('should call addDocument on DocumentService', function() {
      expect(DocumentService.addDocument).toHaveBeenCalled();
    });

    it('should close the modal on success', function() {
      var response = {message: 'Document added'};
      deferred.resolve(response);
      scope.$digest();
      expect(modalInstance.close).toHaveBeenCalledWith(response);
    });

    it('should close the modal on failure', function() {
      var response = {message: 'Document not deleted'};
      deferred.reject(response);
      scope.$digest();
      expect(modalInstance.close).toHaveBeenCalledWith(response);
    })
  });
});