(() => {
  angular
    .module('app')
    .factory('ContextService', ContextService);

  function ContextService($http) {
    const prefix = 'angular/core/views/partials/';
    const templates = [
      {
        url: prefix + '_index.header.html'
      },
      {
        url: prefix + '_document.header.html'
      },
      {
        url: prefix + '_gridfs.header.html'
      },
      {
        url: prefix + '_collection.header.html'
      }
    ];
    let activeTemplate = templates[0];

    let service = {
      alerts: [],
      context: {},
      getIndex: getIndex,
      getDocumentContext: getDocumentContext,
      getDatabaseContext: getDatabaseContext,
      getCollectionContext: getCollectionContext,
      getGridfsContext: getGridfsContext,
      templates: templates,
      getActiveTemplate: getActiveTemplate,
      setActiveTemplate: setActiveTemplate,
      addAlert: addAlert,
      closeAlert: closeAlert
    };

    return service;

    function addAlert(alert) {
      service.alerts.push(alert);
    }

    function closeAlert(index) {
      service.alerts.splice(index, 1);
    }

    function getIndex() {
      return $http.get('/api/index')
        .then(getIndexComplete);

      function getIndexComplete(response) {
        angular.extend(service.context, response.data);
      }
    }

    function getGridfsContext(db, bucket) {
      return $http.get('/api/db/' + db + '/gridFS/' + bucket)
        .then(getGridfsContext);

      function getGridfsContext(response) {
        angular.extend(service.context, response.data);
        return response.data;
      }
    }

    function getDatabaseContext(db) {
      return $http.get('/api/db/' + db)
        .then(getDatabaseContextComplete);

      function getDatabaseContextComplete(response) {
        angular.extend(service.context, response.data);
        return response.data;
      }
    }

    function getDocumentContext(db, collection, document) {
      return $http.get('/api/db/' + db + '/' + collection + '/' + JSON.stringify(document, null, '    '))
        .then(getDocumentContextComplete);

      function getDocumentContextComplete(response) {
        angular.extend(service.context, response.data)
        return response.data;
      }
    }

    function getCollectionContext(db, collection) {
      return $http.get('/api/db/' + db + "/" + collection)
        .then(getCollectionContextComplete);

      function getCollectionContextComplete(response) {
        angular.extend(service.context, response.data)
        return response.data;
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