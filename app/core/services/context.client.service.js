(() => {
  angular
    .module('app')
    .factory('ContextService', ContextService);

  function ContextService($http) {
    let prefix = 'angular/core/views/partials/';
    let templates = [
      {
        url: prefix + '_index.header.client.tpl.html'
      },
      {
        url: prefix + '_document.header.client.tpl.html'
      },
      {
        url: prefix + '_gridfs.header.client.tpl.html'
      },
      {
        url: prefix + '_collection.header.client.tpl.html'
      }
    ];
    let activeTemplate = templates[0];
    let service = {
      context: {},
      getIndex: getIndex,
      getDatabaseContext: getDatabaseContext,
      templates: templates,
      getActiveTemplate: getActiveTemplate,
      setActiveTemplate: setActiveTemplate
    };

    return service;

    function getIndex() {
      return $http.get('/api/index')
        .then(getIndexComplete);

      function getIndexComplete(response) {
        angular.extend(service.context, response.data);
      }
    }

    function getDatabaseContext() {
      return $http.get('/api/database')
        .then(getDatabaseContextComplete);

      function getDatabaseContextComplete(response) {
        angular.extend(service.context, response.data);
      }
    }

    function getActiveTemplate() {
      return activeTemplate;
    }

    function setActiveTemplate(id) {
      activeTemplate = service.activeTemplate = templates[id];
    }
  }
})();