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
          response.type = 'success';
          $uibModalInstance.close(response);
        })
        .catch((response) => {
          response.type = 'danger';
          $uibModalInstance.close(response);
         });
    }

    function close() {
      $uibModalInstance.dismiss();
    };
  }
})();