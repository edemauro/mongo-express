(() => {
  'use strict';

  angular
    .module('app')
    .controller('HeaderController', HeaderController);

  function HeaderController(ContextService, $scope, $state) {
    let vm = this;

    vm.context = ContextService.context;

    activate();

    function activate() {
      vm.activeTemplate = ContextService.getActiveTemplate();
      $scope.$on('$stateChangeSuccess', stateChangeSuccess);

      function stateChangeSuccess() {
        vm.activeTemplate = ContextService.getActiveTemplate();
      }
    }
  }
})();