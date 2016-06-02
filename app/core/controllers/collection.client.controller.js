(() => {
  'use strict';

  angular
    .module('app')
    .controller('CollectionController', CollectionController);

    function CollectionController(ContextService, $stateParams) { 
      let vm = this;
      vm.context = ContextService.context;

      ContextService.setActiveTemplate(3);

      console.log(vm.context);
    }
})();