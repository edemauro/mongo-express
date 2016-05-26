(() => {
  angular
    .module('app')
    .factory('BreadCrumbsService', BreadCrumbsService);

    function BreadCrumbsService($http) {
      let service = {};

      service.breadcrumbs = {};
      service.get = () => {
        return $http.get('/breadcrumbs')
          .then(getBreadCrumbsComplete);

        function getBreadCrumbsComplete(response) {
          service.breadcrumbs = response.data;
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