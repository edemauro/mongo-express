describe('AlertController', function() {
  var scope, 
    AlertController,
    ContextService;

  beforeEach(function() {
    module('app');

    inject(function($rootScope, $controller, _ContextService_) {
      ContextService = _ContextService_;
      scope = $rootScope.$new();
      AlertController = $controller('AlertController', {
        $scope: scope,
        ContextService: ContextService
      });
    });
  });

  it('should be registered', function() {
    expect(AlertController).toBeDefined();
  });

  it('should expose a method to close an alert', function() {
    expect(AlertController.closeAlert).toBeDefined();
  });

  it('should have an empty array of alerts', function() {
    expect(angular.isArray(AlertController.alerts)).toBe(true);
    expect(AlertController.alerts).toEqual([]);
  });
});