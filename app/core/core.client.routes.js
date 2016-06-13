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
        controllerAs: 'vm',
        resolve: {
          databasePrepService: databasePrepService
        }
      })
      .state('collection', {
        url: '/db/:database/:collection',
        templateUrl: '/angular/core/views/collection.client.view.html',
        controller: 'CollectionController',
        controllerAs: 'vm',
        resolve: {
          collectionPrepService: collectionPrepService
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
  }

  function gridfsPrepService($stateParams, ContextService) {
    return ContextService.getGridfsContext($stateParams.database, $stateParams.bucket);
  }

  function databasePrepService($stateParams, ContextService) {
    return ContextService.getDatabaseContext($stateParams.database);
  }

  function documentPrepService($stateParams, ContextService) {
    return ContextService.getDocumentContext($stateParams.database, $stateParams.collection, $stateParams.document);
  }

  function collectionPrepService($stateParams, ContextService) {
    return ContextService.getCollectionContext($stateParams.database, $stateParams.collection);
  }
})();