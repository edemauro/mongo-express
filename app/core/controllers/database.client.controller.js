(() => {
  'use strict';

  angular
    .module('app')
    .controller('DatabaseController', DatabaseController);

    function DatabaseController(ContextService) { 
      let vm = this;
      vm.context = ContextService.context;

      console.log(vm.context);
    }

})();