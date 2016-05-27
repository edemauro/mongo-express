(() => {
  'use strict';

  angular
    .module('app')
    .controller('DatabaseController', DatabaseController);

    function DatabaseController(ContextService, $stateParams) { 
      let vm = this;
      vm.context = ContextService.context;

      ContextService.getDatabaseContext($stateParams.database)
      .then(() => {
        vm.context = ContextService.context;
        console.log(vm.context);
      });
    }
})();