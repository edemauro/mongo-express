(() => {
  'use strict';

  angular
    .module('app')
    .controller('IndexController', IndexController);

  function IndexController(ContextService, $uibModal, DatabaseService) {
    let vm = this;

    vm.context = ContextService.context;
    vm.deleteDb = deleteDb;
    vm.addDb = addDb;

    ContextService.setActiveTemplate(0);

    ContextService.getIndex()
      .then(() => {
        vm.context = ContextService.context;
        if(vm.context.ctx.info.uptime > 86400) {
          vm.uptimeDays = window.Math.floor(vm.context.ctx.info.uptime / 86400) + 'days';
        }
      });

    function addDb() {
      DatabaseService.addDatabase(vm.database)
        .then(addDatabaseComplete)
        .catch(addDatabaseFailed);

      function addDatabaseComplete(response) {
        ContextService.addAlert({type: 'success', msg: response.message });
        vm.database = "";

        return ContextService.getIndex()
          .then(() => {
            vm.context = ContextService.context;
          });
      }

      function addDatabaseFailed(response) {
        ContextService.addAlert({type: 'danger', msg: response.message });
      }
    }

    function deleteDb(db) {
      let modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'deleteModalContent.html',
        controller: 'ModalController',
        controllerAs: 'vm',
        resolve: {
          db: () => {
            return db;
          }
        }
      });

      modalInstance.result.then((response) => {
        ContextService.addAlert({type: response.type, msg: response.message });
        
        return ContextService.getIndex()
          .then(() => {
            vm.context = ContextService.context;
          });
      });
    };
  };
})();