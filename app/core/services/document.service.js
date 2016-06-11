(() => {
  angular
    .module('app')
    .factory('DocumentService', DocumentService);

  function DocumentService($http) {
    let service = {
      addDocument: addDocument,
      deleteDocument: deleteDocument,
      updateDocument: updateDocument
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

    function deleteDocument(db, collection, document) {
      return $http.delete('/api/db/' + db + '/' + collection + '/' + JSON.stringify(document, null, '    '))
        .then(deleteDocumentComplete);

      function deleteDocumentComplete(response) {
        return response;
      }
    }

    function updateDocument(db, collection, document, documentName) {
      return $http.post('/checkValid', {document: document})
        .then(documentCheckComplete)
        .then(updateDocumentComplete);

      function documentCheckComplete(response) {
        return $http.put('/api/db/' + db + '/' + collection + '/' + JSON.stringify(documentName, null, '    '), {document: document});
      }

      function updateDocumentComplete(response)  {
        return response;
      }
    }
  }
})();