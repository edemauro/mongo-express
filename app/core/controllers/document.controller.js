(() => {
  'use strict';

  angular
    .module('app')
    .controller('DocumentController', DocumentController);

  function DocumentController(ContextService, $stateParams, $state) {
    let vm = this;
    
    vm.context = ContextService.context;
    vm.doc = vm.context.ctx.docString;
    vm.editorOptions = { 
      mode: { name: 'javascript', json: true },
      indentUnit: 4,
      lineNumbers: true,
      autoClearEmptyLines: true,
      matchBrackets: true,
      readOnly: vm.context.readOnly
    };
    vm.back = back;

    function back() {
      if(confirm('Are you sure you wish to go back?')) {
        $state.go('collection', {
          'database': $stateParams.database,
          'collection': $stateParams.collection
        });
      }
    }

    // console.log(vm.context);
  }
})();