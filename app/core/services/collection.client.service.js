(() => {
  angular
    .module('app')
    .factory('CollectionService', CollectionService);

  function CollectionService($http) {
    let service = {
      deleteCollection: deleteCollection,
      exportCollection: exportCollection,
      addCollection: addCollection,
      renameCollection: renameCollection
    };

    return service;

    function addCollection(db, collection) {
      return $http.post('/api/db/' + db, {collection: collection})
        .then(addCollectionComplete);

      function addCollectionComplete(response) {
        return response;
      }
    }
    
    function deleteCollection(db, collection) {
        return $http.delete('/api/db/' + db + '/' + collection)
          .then(deleteCollectionComplete);

        function deleteCollectionComplete(response) {
          return response;
        }
    }

    function exportCollection(db, collection) {
      return $http.get('/api/db/' + db + '/export/' + collection)
        .then(exportCollectionComplete);

        function exportCollectionComplete(response) {
          console.log(response);
          return response;
        }

        function exportCollectionFailure(err) {
          console.log(err);
        }
    }

    function renameCollection(db, coll, name) {
      return $http.put('/api/db/' + db + '/' + coll, {collection: name})
        .then(renameCollectionComplete);

      function renameCollectionComplete(response) {
        console.log(response);
        return response;
      }
    }
  }
})();