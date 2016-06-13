(() => {
  'use strict';

  angular
    .module('app')
    .controller('AlertController', AlertController);

    function AlertController(ContextService) { 
      let vm = this;
    }
})();