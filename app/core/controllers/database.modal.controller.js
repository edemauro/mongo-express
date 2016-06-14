(() => {
  'use strict';

  angular
    .module('app')
    .controller('ModalController', ModalController);

  function ModalController($uibModalInstance, DatabaseService, db) {
    let vm = this;

    vm.close = close;
    vm.database = db;
    vm.dbConfirm = "";
    vm.deleteDb = deleteDb;
    vm.showMessage = false;

    function deleteDb() {
      if(vm.dbConfirm === vm.database) {
        DatabaseService.deleteDatabase(db)
          .then((response) => {
            response.type = 'success';
            $uibModalInstance.close(response);
          })
          .catch((response) => {
            response.type = 'danger';
            $uibModalInstance.close(response);
          });
      } else {
        vm.showMessage = true;
      }
    };

    function close() {
      $uibModalInstance.dismiss();
    };
  }
})();