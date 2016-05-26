(() => {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/angular/core/views/index.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      });
  }
})();