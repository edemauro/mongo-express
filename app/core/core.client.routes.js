(() => {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("home");

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/angular/core/views/home.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      });
  }
})();