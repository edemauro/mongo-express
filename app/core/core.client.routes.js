(() => {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: '/angular/core/views/index.client.view.html',
        controller: 'IndexController',
        controllerAs: 'vm'
      })
      .state('database', {
        url: '/db/:database',
        templateUrl: '/angular/core/views/database.client.view.html',
        controller: 'DatabaseController',
        controllerAs: 'vm'
      })
      .state('collection', {
        url: '/db/:database/:collection',
        templateUrl: '/angular/core/views/collection.client.view.html',
        controller: 'CollectionController',
        controllerAs: 'vm'
      });
  }
})();