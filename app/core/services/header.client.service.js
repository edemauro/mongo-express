(() => {
  angular
    .module('app')
    .factory('HeaderService', HeaderService);

  function HeaderService($http) {
    let prefix = 'angular/core/views/partials/';
    let templates = [
      {
        url: prefix + '_index.header.client.tpl.html'
      },
      {
        url: prefix + '_document.header.client.tpl.html'
      }
    ];
    let activeTemplate = templates[0];
    let service = {
      breadcrumbs: {},
      getIndex: getIndex,
      templates: templates,
      activeTemplate: activeTemplate
    };

    return service;

    function getIndex() {
      return $http.get('/api/index')
        .then(getIndexComplete);

      function getIndexComplete(response) {
        angular.extend(service.breadcrumbs, response.data);
      }
    }
  }
})();