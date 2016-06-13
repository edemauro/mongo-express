(() => {
  'use strict';

  angular
    .module('app')
    .controller('GridfsController', GridfsController);

  function GridfsController(ContextService, $stateParams, DocumentService, $state) {
    let vm = this;
    vm.context = ContextService.context;
    vm.deleteBucketFile = deleteBucketFile;

    function deleteBucketFile(file) {
      return DocumentService.deleteBucketFile($stateParams.database, $stateParams.bucket, file)
        .then((response) => {
          console.log(response);
          $state.go('database',{
              'database': $stateParams.database
            });
        })
    }

    console.log(vm.context);
  };
})();