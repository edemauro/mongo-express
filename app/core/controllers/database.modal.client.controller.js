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

    // send delete http request IF dbconfirm === db
    function deleteDb() {
      if(vm.dbConfirm === vm.database) {
        DatabaseService.deleteDatabase(db)
          .then((response) => {
            $uibModalInstance.close(response);
          });
      } else {
        console.log('they do not match!');
      }
    };

    function close() {
      $uibModalInstance.dismiss();
    };
  }
})();