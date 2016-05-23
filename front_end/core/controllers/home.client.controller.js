(() => {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  function HomeController() {
    var vm = this;
    console.log('a');
  };
})();