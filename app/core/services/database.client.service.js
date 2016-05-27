(() => {
  angular
    .module('app')
    .factory('DatabaseService', DatabaseService);

  function DatabaseService($http) {
    let service = {
      deleteDatabase: deleteDatabase
    };

    return service;
    
    function deleteDatabase(db) {
        return $http.delete('/api/' + db)
          .then(deleteDatabaseComplete);

        function deleteDatabaseComplete(response) {
          return response;
        }
    }
  }
})();