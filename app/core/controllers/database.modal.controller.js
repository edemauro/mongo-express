(() => {
  'use strict';

  angular
    .module('app')
    .controller('ModalController', ModalController);

  function ModalController($uibModalInstance, DatabaseService, db) {
    let vm = this;

    vm.database = db;
    vm.dbConfirm = "";
    vm.deleteDb = deleteDb;
    vm.close = close;
    vm.showMessage = false;

    function deleteDb() {
      if(vm.dbConfirm === vm.database) {
        DatabaseService.deleteDatabase(db)
          .then((response) => {
            $uibModalInstance.close(response);
          })
          .catch((response) => {
            $uibModalInstance.close(response);
          });
      } else {
        vm.showMessage = true;
        console.log('they do not match!');
      }
    };

    function close() {
      $uibModalInstance.dismiss();
    };
  }
})();