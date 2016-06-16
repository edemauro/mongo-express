describe('GridfsController:', function() {
  beforeEach(module('app'));

  var scope, 
    GridfsController,
    ContextService,
    GridfsService,
    $stateParams,
    $state;

  beforeEach(function() {

    inject(function($rootScope, $controller, _ContextService_, _$stateParams_, _$state_, _GridfsService_) {
      ContextService = _ContextService_;
      $stateParams = _$stateParams_;
      $state = _$state_;
      GridfsService = _GridfsService_;
      scope = $rootScope.$new();

      spyOn(ContextService, 'addAlert');

      ContextService.context = mockData.getMockGridfs();

      GridfsController = $controller('GridfsController', {
        $scope: scope,
        GridfsService: GridfsService,
        ContextService: ContextService,
        $state: $state,
        $stateParams: $stateParams
      });
    });
  });

  it('should be registered', function() {
    expect(GridfsController).toBeDefined();
  });

  describe('addFile', function() {
    var deferred;
    beforeEach(inject(function($q){
      deferred = $q.defer();
      spyOn(GridfsService, 'addFile').and.returnValue(deferred.promise);
    }))

    it('should add a warning if no file is chosen', function() {
      GridfsController.addFile();
      expect(ContextService.addAlert).toHaveBeenCalled();
    });

    it('should call addFile on GridfsService', function() {
      GridfsController.file = 'Test';
      GridfsController.addFile();
      expect(GridfsService.addFile).toHaveBeenCalled();
    });

    it('should add an alert and redirect to database view on success', function() {
      spyOn($state, 'go');
      GridfsController.file = 'Test';
      GridfsController.addFile();
      deferred.resolve({message: 'File added.'});
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalled();
    });

    it('should add an alert on failure', function() {
      GridfsController.file = 'Test';
      GridfsController.addFile();
      deferred.reject({message: 'File added.'});
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
    });
  });

  describe('deleteFile', function() {
    var deferred;
    beforeEach(inject(function($q){
      deferred = $q.defer();
      spyOn(GridfsService, 'deleteFile').and.returnValue(deferred.promise);
    }));

    it('should call deleteFile on GridfsService', function() {
      GridfsController.deleteFile();
      expect(GridfsService.deleteFile).toHaveBeenCalled();
    });

    it('should add an alert and redirect to database view on success', function() {
      spyOn($state, 'go');
      GridfsController.deleteFile();
      deferred.resolve({message: 'File deleted.'});
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalled();
    });

    it('should add an alert on failure', function() {
      GridfsController.deleteFile();
      deferred.reject({message: 'File deleted.'});
      scope.$digest();
      expect(ContextService.addAlert).toHaveBeenCalled();
    });
  });
});