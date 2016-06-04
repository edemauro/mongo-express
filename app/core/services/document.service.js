(() => {
  angular
    .module('app')
    .factory('DocumentService', DocumentService);

  function DocumentService($http) {
    let service = {
      addDocument: addDocument
    };

    return service;

    function addDocument(db, collection, document) {
      return $http.post('/checkValid', {document: document})
        .then(documentCheckComplete)
        .then(addDocumentComplete);

      function documentCheckComplete(response) {
        return $http.post('/api/db/' + db + '/' + collection, {document: document});
      }

      function addDocumentComplete(response) {
        return response;
      }
    }
  }
})();