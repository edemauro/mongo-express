(() => {
  'use strict';

  angular
    .module('app', ['ui.router', 'ui.bootstrap']);
  //   .run(run);

  // function run($rootScope) {
  //   $rootScope.$on('$stateChangeSuccess', determineHeaderTemplate);

  //   function determineHeaderTemplate(event, toState, toParams, fromState, fromParams) {
  //     console.log(toState);
  //     // figure out best way to change the templates
  //     // might not be necessary to do this since when we go to one of the 5 routes
  //     // that actually changes the header, we have to get the entire CTX anyway
  //   }
  // }
})();
