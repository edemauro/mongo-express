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