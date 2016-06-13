(() => {
  'use strict';

  angular
    .module('app')
    .controller('CollectionController', CollectionController);

    function CollectionController(ContextService, $stateParams, $uibModal, $state, CollectionService, DocumentService) { 
      let vm = this;
      vm.context = ContextService.context;
      vm.addDocument = addDocument;
      vm.deleteCollection = deleteCollection;
      vm.renameCollection = renameCollection;
      vm.totalItems = vm.context.ctx.docs.length;
      vm.currentPage = 1;
      vm.itemsPerPage = 10;
      vm.pageChanged = pageChanged;
      vm.loadDocument = loadDocument;
      vm.deleteDocument = deleteDocument;
      vm.compact = compact;
      vm.searchValue = "";

      ContextService.setActiveTemplate(3);

      console.log(vm.context);

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

        modalInstance.result.then(() => {
          return ContextService.getCollectionContext($stateParams.database, $stateParams.collection)
            .then(() => {
              vm.context = ContextService.context;
            });
        }, () => {
          console.log('Modal dismissed at: ' + new Date());
        });
      }

      function compact() {
        return CollectionService.compactCollection($stateParams.database, $stateParams.collection)
          .then((response) => {
            console.log(response);
            // need to implement alerts!!
          })
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

      function pageChanged() {
        console.log(vm.currentPage);
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