describe('HeaderController:', function() {
  beforeEach(module('app'));

  var scope, 
    HeaderController,
    ContextService,
    $rootScope,
    $state;

  beforeEach(function() {

    inject(function(_$rootScope_, $controller, _ContextService_, _$state_) {
      ContextService = _ContextService_;
      $state = _$state_;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();

      ContextService.context = mockData.getMockGridfs();

      HeaderController = $controller('HeaderController', {
        $scope: scope,
        ContextService: ContextService,
        $state: $state
      });
    });
  });

  it('should be registered', function() {
    expect(HeaderController).toBeDefined();
  });

  it('should get the new template on state change success', function() {
    spyOn(ContextService, 'getActiveTemplate');
    $rootScope.$broadcast('$stateChangeSuccess');
    expect(ContextService.getActiveTemplate).toHaveBeenCalled();
  });
});