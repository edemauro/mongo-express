(() => {
  'use strict';

  angular
    .module('app')
    .controller('CollectionModalController', CollectionModalController);

  function CollectionModalController($uibModalInstance, CollectionService, db, collection) {
    let vm = this;

    vm.close = close;
    vm.collection = collection;
    vm.collectionConfirm = "";
    vm.deleteCollection = deleteCollection;
    vm.showMessage = false;

    function deleteCollection() {
      if(vm.collectionConfirm === vm.collection) {
        return CollectionService.deleteCollection(db, collection)
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
        console.log('they do not match!');
      }
    };

    function close() {
      $uibModalInstance.dismiss();
    };
  }
})();