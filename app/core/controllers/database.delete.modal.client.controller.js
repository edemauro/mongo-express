(() => {
  'use strict';

  angular
    .module('app')
    .controller('ModalController', ModalController);

  function ModalController($uibModalInstance, DatabaseService, db) {
    let vm = this;

    vm.database = db;
    vm.dbConfirm = "";

    // send delete http request IF dbconfirm === db
    vm.delete = () => {
      if(vm.dbConfirm === vm.database) {
        DatabaseService.deleteDatabase(db)
        .then((response) => {
          $uibModalInstance.close(response);
        });
      } else {
        console.log('they do not match!');
      }
    };

    vm.close = () => {
      $uibModalInstance.dismiss();
    };
  }
})();