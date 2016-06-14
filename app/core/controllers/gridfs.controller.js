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

    ContextService.setActiveTemplate(2);

    function addFile() {
      if(!vm.file) {
        ContextService.addAlert({type: 'danger', msg: 'No file chosen.' });
        return;
      }

      return GridfsService.addFile($stateParams.database, $stateParams.bucket, vm.file)
        .then(addFileCompleted)
        .catch(addFileFailed);

      function addFileCompleted(response) {
        ContextService.addAlert({type: 'success', msg: response.message });

        $state.go('database',{
          'database': $stateParams.database
        });
      }

      function addFileFailed(response) {
        ContextService.addAlert({type: 'danger', msg: response.message });
      }
    }

    function deleteFile(file) {
      return GridfsService.deleteFile($stateParams.database, $stateParams.bucket, file)
        .then(deleteFileCompleted)
        .catch(deleteFileFailed);

      function deleteFileCompleted(response) {
        ContextService.addAlert({type: 'success', msg: response.message });

        $state.go('database',{
          'database': $stateParams.database
        });
      }

      function deleteFileFailed(response) {
        ContextService.addAlert({type: 'danger', msg: response.message });
      }
    }
  };
})();