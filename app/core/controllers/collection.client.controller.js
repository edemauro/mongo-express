(() => {
  'use strict';

  angular
    .module('app')
    .controller('CollectionController', CollectionController);

    function CollectionController(ContextService, $stateParams, $uibModal) { 
      let vm = this;
      vm.context = ContextService.context;
      vm.addDocument = addDocument;

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
    }
})();