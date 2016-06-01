(() => {
  'use strict';

  angular
    .module('app')
    .controller('CollectionController', CollectionController);

    function CollectionController(ContextService, $stateParams) { 
      let vm = this;
      vm.context = ContextService.context;

      ContextService.getDatabaseContext($stateParams.database)
      .then(() => {
        vm.context = ContextService.context;
        console.log(vm.context);
        console.log($stateParams);
      });
    }
})();