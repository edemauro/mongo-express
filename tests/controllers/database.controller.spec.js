describe('DatabaseController:', function() {
  beforeEach(module('app'));

  var scope, 
    DatabaseController,
    ContextService,
    $stateParams,
    $uibModal,
    CollectionService,
    fakeModal = {
      result: {
        then: function(confirmCallback, cancelCallback) {
              //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
              this.confirmCallBack = confirmCallback;
              this.cancelCallback = cancelCallback;
        }
      },
      close: function( item ) {
          //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
          this.result.confirmCallBack( item );
      },
      dismiss: function( type ) {
          //The user clicked cancel on the modal dialog, call the stored cancel callback
          this.result.cancelCallback( type );
      }
    };


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
    beforeEach(function() {
      spyOn($uibModal, 'open').and.returnValue(fakeModal);
      DatabaseController.deleteCollection();
    });

    it('should open a new modal', function() {
      expect($uibModal.open).toHaveBeenCalled();
    });
  })
});