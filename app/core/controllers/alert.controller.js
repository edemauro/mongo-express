(() => {
  'use strict';

  angular
    .module('app')
    .controller('AlertController', AlertController);

    function AlertController(ContextService) { 
      let vm = this;

      vm.alerts = ContextService.alerts;
      vm.closeAlert = closeAlert;

      function closeAlert(index) {
        ContextService.closeAlert(index);
      }
    }
})();