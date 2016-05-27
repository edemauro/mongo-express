(() => {
  'use strict';

  angular
    .module('app')
    .controller('HeaderController', HeaderController);

  function HeaderController(HeaderService) {
    let vm = this;
    vm.breadcrumbs = HeaderService.breadcrumbs;
    vm.activeTemplate = HeaderService.activeTemplate;
    // need to determine which template. thinking during statechangesuccess
  };
})();