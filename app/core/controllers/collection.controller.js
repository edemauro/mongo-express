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
            db: () => {
              return $stateParams.database;
            },
            collection: () => {
              return $stateParams.collection;
            }
          }
        });

        modalInstance.result.then((response) => {
          ContextService.addAlert({type: response.type, msg: response.message });

          return ContextService.getCollectionContext($stateParams.database, $stateParams.collection)
            .then(() => { vm.context = ContextService.context; });
        });
      }

      function compact() {
        return CollectionService.compactCollection($stateParams.database, $stateParams.collection)
          .then(compactCollectionComplete)
          .catch(compactCollectionFailed);

        function compactCollectionComplete(response) {
          ContextService.addAlert({type: 'success', msg: 'collection compacted!' });
        }

        function compactCollectionFailed(response) {
          ContextService.addAlert({type: 'danger', msg: response.message });
        }
      }

      function deleteDocument(id) {
        return DocumentService.deleteDocument($stateParams.database, $stateParams.collection, id)
          .then(() => {
            return ContextService.getCollectionContext($stateParams.database, $stateParams.collection)
              .then(() => {
                vm.context = ContextService.context;
              });
          });
      }

      function deleteCollection() {
        let modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'collectionModalContent.html',
          controller: 'CollectionModalController',
          controllerAs: 'vm',
          resolve: {
            db: () => {
              return $stateParams.database;
            },
            collection: () => {
              return $stateParams.collection;
            }
          }
        });

        modalInstance.result.then((response) => {
          $state.go('database', { 'database': $stateParams.database });
        }, () => {
          console.log('Modal dismissed at: ' + new Date());
        });
      }

      function renameCollection() {
        return CollectionService.renameCollection($stateParams.database, $stateParams.collection, vm.name)
          .then(() => {
            $state.go('database', { 'database': $stateParams.database });
          });
      }

      function loadDocument(id) {
        $state.go('document', { 
          'database': $stateParams.database,
          'collection': $stateParams.collection,
          'document': id
        });
      }
    }
})();