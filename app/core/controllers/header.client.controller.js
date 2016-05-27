(() => {
  'use strict';

  angular
    .module('app')
    .controller('HeaderController', HeaderController);

  function HeaderController(ContextService) {
    let vm = this;
    vm.context = ContextService.context;
    vm.activeTemplate = ContextService.activeTemplate;
  };
})();