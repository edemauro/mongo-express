(() => {
  'use strict';

  angular
    .module('app')
    .controller('DocumentController', DocumentController);

  function DocumentController(ContextService, $stateParams) {
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

    console.log(vm.context);
  }
})();