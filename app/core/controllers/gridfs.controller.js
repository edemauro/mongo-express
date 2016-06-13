(() => {
  'use strict';

  angular
    .module('app')
    .controller('GridfsController', GridfsController);

  function GridfsController(ContextService, $stateParams) {
    let vm = this;
    vm.context = ContextService.context;

    console.log(vm.context);
  };
})();