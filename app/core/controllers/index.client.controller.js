(() => {
  'use strict';

  angular
    .module('app')
    .controller('IndexController', IndexController);

  function IndexController(ContextService, $uibModal) {
    let vm = this;

    vm.context = ContextService.context;
    ContextService.getIndex()
      .then(() => {
        vm.context = ContextService.context;
        if(vm.context.ctx.info.uptime > 86400) {
          vm.uptimeDays = window.Math.floor(vm.context.ctx.info.uptime / 86400) + 'days';
        }
        console.log(vm.context);
      });

    vm.deleteDb = (db) => {
      // still need to implement deletion + whatever normally happens after deleting
      let modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'deleteModalContent.html',
        controller: 'ModalController',
        controllerAs: 'vm',
        resolve: {
          db: () => {
            return db;
          }
        }
      });

      modalInstance.result.then((response) => {
        ContextService.getIndex()
          .then(() => {
            vm.context = ContextService.context;
          });
      }, () => {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
  };
})();