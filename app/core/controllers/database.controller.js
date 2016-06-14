(() => {
  'use strict';

  angular
    .module('app')
    .controller('DatabaseController', DatabaseController);

    function DatabaseController(ContextService, $stateParams, $uibModal, CollectionService) { 
      let vm = this;

      vm.addCollection = addCollection;
      vm.context = ContextService.context;
      vm.deleteCollection = deleteCollection;

      activate();

      function activate() {
        ContextService.setActiveTemplate(0);
      }

      function addCollection() {
        CollectionService.addCollection($stateParams.database, vm.collection)
          .then(addCollectionComplete)
          .catch(addCollectionFailed);

        function addCollectionComplete(response) {
          ContextService.addAlert({type: 'success', msg: response.message });
          vm.collection = "";

          return ContextService.getDatabaseContext($stateParams.database)
            .then(() => { vm.context = ContextService.context; });
        }

        function addCollectionFailed(response) {
          ContextService.addAlert({type: 'danger', msg: response.message });
        }
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
          ContextService.addAlert({type: response.type, msg: response.message });

          return ContextService.getDatabaseContext($stateParams.database)
            .then(() => { vm.context = ContextService.context; });
        });
      }
    }
})();