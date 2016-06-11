(() => {
  'use strict';

  angular
    .module('app')
    .controller('DocumentController', DocumentController);

  function DocumentController(ContextService, $stateParams, $state, DocumentService) {
    let vm = this;
    
    vm.context = ContextService.context;
    vm.doc = vm.context.ctx.docString;
    vm.editorOptions = { 
      mode: { name: 'javascript', json: true },
      indentUnit: 4,
      lineNumbers: true,
      autoClearEmptyLines: true,
      matchBrackets: true,
      readOnly: vm.context.readOnly
    };
    vm.back = back;
    vm.updateDocument = updateDocument;

    function back() {
      if(confirm('Are you sure you wish to go back?')) {
        $state.go('collection', {
          'database': $stateParams.database,
          'collection': $stateParams.collection
        });
      }
    }

    function updateDocument() {
      return DocumentService.updateDocument($stateParams.database, $stateParams.collection, vm.doc, $stateParams.document)
        .then((response) => {
          console.log(response);
        })
    }

    // console.log(vm.context);
  }
})();