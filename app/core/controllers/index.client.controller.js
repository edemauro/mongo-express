(() => {
  'use strict';

  angular
    .module('app')
    .controller('IndexController', IndexController)
    .controller('ModalController', ModalController);

  function IndexController(BreadCrumbsService, $uibModal) {
    let vm = this;
    vm.breadcrumbs = BreadCrumbsService.breadcrumbs;
    BreadCrumbsService.getIndex()
      .then(() => {
        vm.breadcrumbs = BreadCrumbsService.breadcrumbs;
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

      modalInstance.result.then((selectedItem) => {
        console.log(selectedItem);
      }, () => {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
  };

  function ModalController($uibModalInstance, db) {
    let vm = this;

    vm.database = db;
    vm.dbConfirm = "";

    // send delete http request IF dbconfirm === db

    vm.close = () => {
      $uibModalInstance.close();
    };
  }
})();