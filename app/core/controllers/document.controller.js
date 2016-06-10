(() => {
  'use strict';

  angular
    .module('app')
    .controller('DocumentController', DocumentController);

  function DocumentController(ContextService, $stateParams) {
    let vm = this;
    
    vm.context = ContextService.context;

    console.log(vm.context);
  }
})();