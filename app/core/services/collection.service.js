(() => {
  angular
    .module('app')
    .factory('CollectionService', CollectionService);

  function CollectionService($http, $q) {
    let service = {
      addCollection: addCollection,
      compactCollection: compactCollection,
      deleteCollection: deleteCollection,
      renameCollection: renameCollection
    };

    return service;

    function addCollection(db, collection) {
      return $http.post('/db/' + db, {collection: collection})
        .then(addCollectionComplete)
        .catch((e) => {
          exception.catcher('XHR failed for addCollection')(e);
          return $q.reject(e.data);
        });

      function addCollectionComplete(response) {
        return response.data;
      }
    }

    function compactCollection(db, collection) {
      return $http.get('/db/' + db + '/compact/' + collection)
        then(compactCollectionComplete)
        .catch((e) => {
          exception.catcher('XHR failed for compactCollection')(e);
          return $q.reject(e.data);
        });

      function compactCollectionComplete(response) {
        return response.data;
      }
    }
    
    function deleteCollection(db, collection) {
        return $http.delete('/db/' + db + '/' + collection)
          .then(deleteCollectionComplete)
          .catch((e) => {
            exception.catcher('XHR failed for deleteCollection')(e);
            return $q.reject(e.data);
          });

        function deleteCollectionComplete(response) {
          return response.data;
        }
    }

    function renameCollection(db, coll, name) {
      return $http.put('/db/' + db + '/' + coll, {collection: name})
        .then(renameCollectionComplete)
        .catch((e) => {
          exception.catcher('XHR failed for renameCollection')(e);
          return $q.reject(e.data);
        });

      function renameCollectionComplete(response) {
        return response.data;
      }
    }
  }
})();