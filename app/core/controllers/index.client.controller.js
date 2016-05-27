(() => {
  'use strict';

  angular
    .module('app')
    .controller('IndexController', IndexController)
    .controller('ModalController', ModalController);

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

      modalInstance.result.then((selectedItem) => {
        console.log(selectedItem);
      }, () => {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
  };

  function ModalController($uibModalInstance, DatabaseService, db) {
    let vm = this;

    vm.database = db;
    vm.dbConfirm = "";

    // send delete http request IF dbconfirm === db
    vm.delete = () => {
      DatabaseService.deleteDatabase(db)
      .then(() => {
        // if successful, update list of dbs
        console.log('then');
      });
    };

    vm.close = () => {
      $uibModalInstance.dismiss();
    };
  }
})();