(() => {
  'use strict';

  angular
    .module('app')
    .controller('DatabaseController', DatabaseController);

    function DatabaseController(ContextService, $stateParams, $uibModal) { 
      let vm = this;
      vm.context = ContextService.context;
      vm.deleteCollection = deleteCollection;

      ContextService.getDatabaseContext($stateParams.database)
      .then(() => {
        vm.context = ContextService.context;
        console.log(vm.context);
      });

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
        ContextService.getDatabaseContext($stateParams.database)
          .then(() => {
            vm.context = ContextService.context;
          });
      }, () => {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
    }
})();