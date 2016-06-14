(() => {
  'use strict';

  angular.module('app')
    .config(config)
    .run(run);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: '/angular/core/views/index.view.html',
        controller: 'IndexController',
        controllerAs: 'vm'
      })
      .state('database', {
        url: '/db/:database',
        templateUrl: '/angular/core/views/database.view.html',
        controller: 'DatabaseController',
        controllerAs: 'vm',
        resolve: {
          databasePrepService: databasePrepService
        }
      })
      .state('collection', {
        url: '/db/:database/:collection',
        templateUrl: '/angular/core/views/collection.view.html',
        controller: 'CollectionController',
        controllerAs: 'vm',
        resolve: {
          collectionPrepService: collectionPrepService
        }
      })
      .state('gridfs', {
        url: '/db/:database/gridFS/:bucket',
        templateUrl: '/angular/core/views/gridfs.view.html',
        controller: 'GridfsController',
        controllerAs: 'vm',
        resolve: {
          gridfsPrepService: gridfsPrepService
        }
      })
      .state('document', {
        url: '/db/:database/:collection/:document',
        templateUrl: '/angular/core/views/document.view.html',
        controller: 'DocumentController',
        controllerAs: 'vm',
        resolve: {
          documentPrepService: documentPrepService
        }
      });
  }

  function run($rootScope, $state) {
    $rootScope.$on('$stateChangeError', stateChangeError)

    function stateChangeError(event, toState, toParams, fromState, fromParams) {
      let msg = 'Error routing to' + toState + '.';
      console.log(msg);
      ContextService.addAlert({type: 'danger', msg: msg});
      $state.go('index');
    }
  }

  function collectionPrepService($stateParams, ContextService) {
    return ContextService.getCollectionContext($stateParams.database, $stateParams.collection);
  }

  function databasePrepService($stateParams, ContextService) {
    return ContextService.getDatabaseContext($stateParams.database);
  }

  function documentPrepService($stateParams, ContextService) {
    return ContextService.getDocumentContext($stateParams.database, $stateParams.collection, $stateParams.document);
  }

  function gridfsPrepService($stateParams, ContextService) {
    return ContextService.getGridfsContext($stateParams.database, $stateParams.bucket);
  }
})();