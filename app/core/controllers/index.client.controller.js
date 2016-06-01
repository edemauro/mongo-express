(() => {
  'use strict';

  angular
    .module('app')
    .controller('IndexController', IndexController);

  function IndexController(ContextService, $uibModal) {
    let vm = this;

    vm.context = ContextService.context;
    vm.deleteDb = deleteDb;

    ContextService.getIndex()
      .then(() => {
        vm.context = ContextService.context;
        if(vm.context.ctx.info.uptime > 86400) {
          vm.uptimeDays = window.Math.floor(vm.context.ctx.info.uptime / 86400) + 'days';
        }
      });

    function deleteDb(db) {
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