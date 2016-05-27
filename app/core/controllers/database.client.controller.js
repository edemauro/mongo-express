(() => {
  'use strict';

  angular
    .module('app')
    .controller('DatabaseController', DatabaseController);

    function DatabaseController(ContextService, $stateParams) { 
      let vm = this;
      vm.context = ContextService.context;

      ContextService.getIndex()
      .then(() => {
        vm.context = ContextService.context;
        console.log(vm.context);
      });
      console.log($stateParams);
    }
})();