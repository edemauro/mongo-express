(() => {
  angular
    .module('app')
    .factory('DatabaseService', DatabaseService);

  function DatabaseService($http, $q, exception) {
    let service = {
      addDatabase: addDatabase,
      deleteDatabase: deleteDatabase
    };

    return service;

    function addDatabase(db) {
      return $http.post('/', {database: db})
        .then(addDatabaseComplete)
        .catch((e) => {
          exception.catcher('XHR failed for addDatabase')(e);
          return $q.reject(e.data);
        });

      function addDatabaseComplete(response) {
        return response.data;
      }
    }
    
    function deleteDatabase(db) {
      return $http.delete('/' + db)
        .then(deleteDatabaseComplete)
        .catch((e) => {
          exception.catcher('XHR failed for deleteDatabase')(e);
          return $q.reject(e.data);
        });

      function deleteDatabaseComplete(response) {
        return response.data;
      }
    }
  }
})();