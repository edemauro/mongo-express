(() => {
  'use strict';

  angular
    .module('app')
    .controller('HeaderController', HeaderController);

  function HeaderController(BreadCrumbsService) {
    let vm = this;
    vm.breadcrumbs = BreadCrumbsService.breadcrumbs;
    vm.templates = [
      {
        url: 'angular/core/views/_index.header.client.tpl.html'
      },
      {
        url: 'angular/core/views/_document.header.client.tpl.html'
      }
    ];

    vm.activeTemplate = vm.templates[0];
    BreadCrumbsService.get()
      .then(() => {
        vm.breadcrumbs = BreadCrumbsService.breadcrumbs;
      });
    // need service to obtain 1) breadcrumbs, 2) which template
  };
})();