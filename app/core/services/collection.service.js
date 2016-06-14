(() => {
  angular
    .module('app')
    .factory('CollectionService', CollectionService);

  function CollectionService($http, $q) {
    let service = {
      deleteCollection: deleteCollection,
      exportCollection: exportCollection,
      addCollection: addCollection,
      renameCollection: renameCollection,
      compactCollection: compactCollection
    };

    return service;

    function addCollection(db, collection) {
      return $http.post('/api/db/' + db, {collection: collection})
        .then(addCollectionComplete)
        .catch(addCollectionFailed);

      function addCollectionComplete(response) {
        return response.data;
      }

      function addCollectionFailed(e) {
        let newMessage = 'XHR Failed for addCollection';
        if(e.data && e.data.message) {
          newMessage = newMessage + '\n' + e.data.message;
        }
        e.data.message = newMessage;
        return $q.reject(e);
      }
    }

    function compactCollection(db, collection) {
      return $http.get('/db/' + db + '/compact/' + collection)
        then(compactCollectionComplete);

      function compactCollectionComplete(response) {
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