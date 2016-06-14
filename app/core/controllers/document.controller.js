(() => {
  'use strict';

  angular
    .module('app')
    .controller('DocumentController', DocumentController);

  function DocumentController(ContextService, $stateParams, $state, DocumentService) {
    let vm = this;
    
    vm.back = back;
    vm.context = ContextService.context;
    vm.deleteDocument = deleteDocument;
    vm.doc = vm.context.ctx.docString;
    vm.editorOptions = { 
      mode: { name: 'javascript', json: true },
      indentUnit: 4,
      lineNumbers: true,
      autoClearEmptyLines: true,
      matchBrackets: true,
      readOnly: vm.context.readOnly
    };
    vm.updateDocument = updateDocument;

    activate();

    function activate() {
      ContextService.setActiveTemplate(1); 
    }

    function back() {
      if(confirm('Are you sure you wish to go back?')) {
        $state.go('collection', {
          'database': $stateParams.database,
          'collection': $stateParams.collection
        });
      }
    }

    function deleteDocument() {
        return DocumentService.deleteDocument($stateParams.database, $stateParams.collection, $stateParams.document)
          .then(deleteDocumentCompleted)
          .catch(deleteDocumentFailed);

        function deleteDocumentCompleted(response) {
          ContextService.addAlert({type: 'success', msg: response.message });

          $state.go('collection', {
            'database': $stateParams.database,
            'collection': $stateParams.collection
          });
        }

        function deleteDocumentFailed(response) {
          ContextService.addAlert({type: 'danger', msg: response.message });
        }
      }

    function updateDocument() {
      return DocumentService.updateDocument($stateParams.database, $stateParams.collection, vm.doc, $stateParams.document)
        .then(updateDocumentCompleted)
        .catch(updateDocumentFailed);

      function updateDocumentCompleted(response) {
          ContextService.addAlert({type: 'success', msg: response.message });

          $state.go('collection', {
            'database': $stateParams.database,
            'collection': $stateParams.collection
          });
        }

        function updateDocumentFailed(response) {
          ContextService.addAlert({type: 'danger', msg: response.message });
        }
    }
  }
})();