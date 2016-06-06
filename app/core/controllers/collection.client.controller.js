(() => {
  'use strict';

  angular
    .module('app')
    .controller('CollectionController', CollectionController);

    function CollectionController(ContextService, $stateParams, $uibModal, $state, CollectionService) { 
      let vm = this;
      vm.context = ContextService.context;
      vm.addDocument = addDocument;
      vm.deleteCollection = deleteCollection;
      vm.renameCollection = renameCollection;
      vm.totalItems = vm.context.ctx.docs.length;
      vm.currentPage = 1;
      vm.itemsPerPage = 10;
      vm.pageChanged = pageChanged;

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

        modalInstance.result.then((response) => {
          // return ContextService.getDatabaseContext($stateParams.database)
          //   .then(() => {
          //     vm.context = ContextService.context;
          //   });
          console.log(response);
        }, () => {
          console.log('Modal dismissed at: ' + new Date());
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
          // not updating navbar
          $state.go('database', { 'database': $stateParams.database });
        }, () => {
          console.log('Modal dismissed at: ' + new Date());
        });
      }

      function renameCollection() {
        return CollectionService.renameCollection($stateParams.database, $stateParams.collection, vm.name)
          .then(() => {
            // not updating navbar
            $state.go('database', { 'database': $stateParams.database });
          });
      }

      function pageChanged() {
        console.log(vm.currentPage);
      }
    }
})();