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
      }

      return service;

    }
})();