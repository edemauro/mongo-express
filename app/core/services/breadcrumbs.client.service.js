(() => {
  angular
    .module('app')
    .factory('BreadCrumbsService', BreadCrumbsService);

    function BreadCrumbsService($http) {
      let service = {};

      service.breadcrumbs = {};
      service.getIndex = () => {
        return $http.get('/api/index')
          .then(getBreadCrumbsComplete);

        function getBreadCrumbsComplete(response) {
          angular.extend(service.breadcrumbs, response.data);
        }
      };

      service.templates = [
        {
          url: 'angular/core/views/partials/_index.header.client.tpl.html'
        },
        {
          url: 'angular/core/views/partials/_document.header.client.tpl.html'
        }
      ];

      service.activeTemplate = service.templates[0];

      return service;

    }
})();