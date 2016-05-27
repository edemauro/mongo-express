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