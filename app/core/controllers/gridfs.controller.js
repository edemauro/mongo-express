(() => {
  'use strict';

  angular
    .module('app')
    .controller('GridfsController', GridfsController);

  function GridfsController(ContextService, $stateParams, GridfsService, $state) {
    let vm = this;

    vm.addFile = addFile;
    vm.context = ContextService.context;
    vm.deleteFile = deleteFile;

    function addFile() {
      return GridfsService.addFile($stateParams.database, $stateParams.bucket, vm.file)
        .then((response) => {
          console.log(response);
          $state.go('database',{
            'database': $stateParams.database
          });
        });
    }

    function deleteFile(file) {
      return GridfsService.deleteFile($stateParams.database, $stateParams.bucket, file)
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