(() => {
  'use strict';

  angular
    .module('app')
    .controller('CollectionModalController', CollectionModalController);

  function CollectionModalController($uibModalInstance, CollectionService, db, collection) {
    let vm = this;

    vm.collection = collection;
    vm.collectionConfirm = "";
    vm.deleteCollection = deleteCollection;
    vm.close = close;

    function deleteCollection() {
      if(vm.collectionConfirm === vm.collection) {
        return CollectionService.deleteCollection(db, collection)
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