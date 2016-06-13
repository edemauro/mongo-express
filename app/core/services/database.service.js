(() => {
  angular
    .module('app')
    .factory('DatabaseService', DatabaseService);

  function DatabaseService($http) {
    let service = {
      deleteDatabase: deleteDatabase,
      addDatabase: addDatabase
    };

    return service;

    function addDatabase(db) {
      return $http.post('/', {database: db})
        .then(addDatabaseComplete);

      function addDatabaseComplete(response) {
        return response;
      }
    }
    
    function deleteDatabase(db) {
        return $http.delete('/api/' + db)
          .then(deleteDatabaseComplete);

        function deleteDatabaseComplete(response) {
          return response;
        }
    }
  }
})();