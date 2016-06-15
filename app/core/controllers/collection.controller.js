(() => {
  'use strict';

  angular
    .module('app')
    .controller('CollectionController', CollectionController);

    function CollectionController(ContextService, $stateParams, $uibModal, $state, CollectionService, DocumentService) { 
      let vm = this;

      vm.addDocument = addDocument;
      vm.compact = compact;
      vm.context = ContextService.context;
      vm.currentPage = 1;
      vm.deleteCollection = deleteCollection;
      vm.deleteDocument = deleteDocument;
      vm.itemsPerPage = 10;
      vm.loadDocument = loadDocument;
      vm.renameCollection = renameCollection;
      vm.searchValue = "";
      vm.totalItems = vm.context.ctx.docs.length;

      activate();

      function activate() {
        ContextService.setActiveTemplate(3);
      }

      function addDocument() {
        let modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'addDocumentModalContent.html',
          controller: 'DocumentModalController',
          controllerAs: 'vm',
          resolve: {
            db: () => { return $stateParams.database; },
            collection: () => { return $stateParams.collection; }
          }
        });

        return modalInstance.result.then((response) => {
          ContextService.addAlert({type: response.type, msg: response.message });

          return ContextService.getCollectionContext($stateParams.database, $stateParams.collection)
            .then(() => { vm.context = ContextService.context; });
        });
      }

      function compact() {
        return CollectionService.compactCollection($stateParams.database, $stateParams.collection)
          .then(compactCollectionCompleted)
          .catch(compactCollectionFailed);

        function compactCollectionCompleted(response) {
          ContextService.addAlert({type: 'success', msg: 'collection compacted!' });
        }

        function compactCollectionFailed(response) {
          ContextService.addAlert({type: 'danger', msg: response.message });
        }
      }

      function deleteCollection() {
        let modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'collectionModalContent.html',
          controller: 'CollectionModalController',
          controllerAs: 'vm',
          resolve: {
            db: () => { return $stateParams.database; },
            collection: () => { return $stateParams.collection; }
          }
        });

        return modalInstance.result.then((response) => {
          ContextService.addAlert({type: response.type, msg: response.message });
          $state.go('database', { 'database': $stateParams.database });
        });
      }

      function deleteDocument(id) {
        return DocumentService.deleteDocument($stateParams.database, $stateParams.collection, id)
          .then(deleteDocumentCompleted)
          .catch(deleteDocumentFailed);

        function deleteDocumentCompleted(response) {
          ContextService.addAlert({type: 'success', msg: response.message });

          return ContextService.getCollectionContext($stateParams.database, $stateParams.collection)
            .then(() => { vm.context = ContextService.context; });
        }

        function deleteDocumentFailed(response) {
          ContextService.addAlert({type: 'danger', msg: response.message });
        }
      }

      function loadDocument(id) {
        $state.go('document', { 
          'database': $stateParams.database,
          'collection': $stateParams.collection,
          'document': id
        });
      }

      function renameCollection() {
        return CollectionService.renameCollection($stateParams.database, $stateParams.collection, vm.name)
          .then(renameCollectionCompleted)
          .catch(renameCollectionFailed);

        function renameCollectionCompleted(response) {
          ContextService.addAlert({type: 'success', msg: response.message });
          $state.go('database', { 'database': $stateParams.database });
        }

        function renameCollectionFailed(response) {
          ContextService.addAlert({type: 'danger', msg: response.message });
        }
      }
    }
})();