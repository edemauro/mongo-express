(() => {
  'use strict';

  angular
    .module('app')
    .controller('HeaderController', HeaderController);

  function HeaderController(BreadCrumbsService) {
    let vm = this;
    vm.breadcrumbs = BreadCrumbsService.breadcrumbs;
    vm.activeTemplate = BreadCrumbsService.activeTemplate;
    BreadCrumbsService.get()
      .then(() => {
        vm.breadcrumbs = BreadCrumbsService.breadcrumbs;
      });
    // need service to obtain 1) breadcrumbs, 2) which template
  };
})();