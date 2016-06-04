(() => {
  'use strict';

  angular
    .module('app')
    .controller('DocumentModalController', DocumentModalController);

  function DocumentModalController($uibModalInstance, DocumentService, db, collection) {
    let vm = this;

    vm.addDocument = addDocument;
    vm.close = close;
    vm.editorOptions = { mode: { name: 'javascript', json: true } };

    vm.doc = '{"_id": ObjectID()}';

    function addDocument() {
      return DocumentService.addDocument(db, collection, vm.doc)
        .then((response) => {
          $uibModalInstance.close(response);
        });
    }

    // function deleteCollection() {
    //   if(vm.collectionConfirm === vm.collection) {
    //     return CollectionService.deleteCollection(db, collection)
    //       .then((response) => {
    //         $uibModalInstance.close(response);
    //       });
    //   } else {
    //     console.log('they do not match!');
    //   }
    // };

    function close() {
      $uibModalInstance.dismiss();
    };
  }
})();