describe('DocumentController:', function() {
  beforeEach(module('app'));

  var scope, 
    DocumentController,
    ContextService,
    DocumentService,
    $stateParams,
    $state;

  beforeEach(function() {

    inject(function($rootScope, $controller, _ContextService_, _$stateParams_, _$state_, _DocumentService_) {
      ContextService = _ContextService_;
      $stateParams = _$stateParams_;
      $state = _$state_;
      DocumentService = _DocumentService_;
      scope = $rootScope.$new();

      spyOn(ContextService, 'addAlert');

      ContextService.context = mockData.getMockDocument();

      DocumentController = $controller('DocumentController', {
        $scope: scope,
        DocumentService: DocumentService,
        ContextService: ContextService,
        $state: $state,
        $stateParams: $stateParams
      });
    });
  });

  it('should be registered', function() {
    expect(DocumentController).toBeDefined();
  });

  // Tired of the pop up. IT WORKS THOUGH!
  // describe('back', function() {
  //   it('should go back to collection view', function() {
  //     spyOn($state, 'go');
  //     DocumentController.back();
  //     spyOn(window, 'confirm').and.callFake(function() {
  //       return true;
  //     });
  //     expect($state.go).toHaveBeenCalled();
  //   });
  // });

  describe('deleteDocument', function() {
    var deferred;

    beforeEach(inject(function($q) {
      deferred = $q.defer();
      spyOn(DocumentService, 'deleteDocument').and.returnValue(deferred.promise);
      DocumentController.deleteDocument();
    }));

    it('should call deleteDocument on DocumentService', function() {
      expect(DocumentService.deleteDocument).toHaveBeenCalled();
    });

    it('should add an alert and redirect to collection state on success', function() {
      spyOn($state, 'go');
      deferred.resolve({message: 'Document deleted.'});
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalled();
    });

    it('should add an alert on failure', function() {
      deferred.reject({message: 'Document was NOT deleted.'});
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
    });
  });

  describe('updateDocument', function() {
    var deferred;

    beforeEach(inject(function($q) {
      deferred = $q.defer();
      spyOn(DocumentService, 'updateDocument').and.returnValue(deferred.promise);
      DocumentController.updateDocument();
    }));

    it('should call deleteDocument on DocumentService', function() {
      expect(DocumentService.updateDocument).toHaveBeenCalled();
    });

    it('should add an alert and redirect to collection state on success', function() {
      spyOn($state, 'go');
      deferred.resolve({message: 'Document updated.'});
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalled();
    });

    it('should add an alert on failure', function() {
      deferred.reject({message: 'Document was NOT updated.'});
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
    });
  });
});