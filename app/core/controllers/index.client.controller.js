(() => {
  'use strict';

  angular
    .module('app')
    .controller('IndexController', IndexController);

  function IndexController(BreadCrumbsService) {
    var vm = this;
    vm.breadcrumbs = BreadCrumbsService.breadcrumbs;
    BreadCrumbsService.getIndex()
      .then(() => {
        vm.breadcrumbs = BreadCrumbsService.breadcrumbs;
      });

    vm.deleteDb = (db) => {
      // still need to implement deletion + whatever normally happens after deleting
      console.log(db);
    };
  };
})();