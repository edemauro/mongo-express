(() => {
  'use strict';

  angular
    .module('app')
    .controller('HeaderController', HeaderController);

  function HeaderController() {
    var vm = this;
    // need service to obtain 1) breadcrumbs, 2) which template
    // OR resolve on route changes--prolly better
  };
})();