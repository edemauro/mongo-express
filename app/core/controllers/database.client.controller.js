(() => {
  'use strict';

  angular
    .module('app')
    .controller('DatabaseController', DatabaseController);

    function DatabaseController(ContextService, $stateParams, $uibModal, CollectionService) { 
      let vm = this;
      vm.context = ContextService.context;
      vm.deleteCollection = deleteCollection;
      vm.exportCollection = exportCollection;
      vm.addCollection = addCollection;

      function addCollection() {
        CollectionService.addCollection($stateParams.database, vm.collection)
          .then(() => {
            return ContextService.getDatabaseContext($stateParams.database)
              .then(() => {
                vm.context = ContextService.context;
              });
          });
      }

      function deleteCollection(collection) {
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
              return collection;
            }
          }
        });

        modalInstance.result.then((response) => {
          return ContextService.getDatabaseContext($stateParams.database)
            .then(() => {
              vm.context = ContextService.context;
            });
        }, () => {
          console.log('Modal dismissed at: ' + new Date());
        });
      }

      function exportCollection(collection) {
        return CollectionService.exportCollection($stateParams.database, collection)
          .then((response) => {
            console.log(response);
          });
      }
    }
})();