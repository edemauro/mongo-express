(() => {
  angular
    .module('app')
    .factory('CollectionService', CollectionService);

  function CollectionService($http) {
    let service = {
      deleteCollection: deleteCollection
    };

    return service;
    
    function deleteCollection(db, collection) {
        return $http.delete('/api/db/' + db + '/' + collection)
          .then(deleteCollectionComplete);

        function deleteCollectionComplete(response) {
          return response;
        }
    }
  }
})();