(() => {
  'use strict';

  angular
    .module('app', ['ui.router', 'ui.bootstrap'])
    .run(run);

  function run($rootScope) {
    $rootScope.$on('$stateChangeSuccess', determineHeaderTemplate);

    function determineHeaderTemplate(event, toState, toParams, fromState, fromParams) {
      console.log(toState);
      // figure out best way to change the templates
    }
  }
})();
