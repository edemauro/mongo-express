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
        .catch((e) => {
          exception.catcher('XHR failed for checkValid, addDocument')(e);
          return $q.reject(e.data);
        });

      function documentCheckComplete(response) {
        return $http.post('/db/' + db + '/' + collection, {document: document})
          .then(addDocumentComplete)
          .catch((e) => {
            exception.catcher('XHR failed for addDocument')(e);
            return $q.reject(e.data);
          });

        function addDocumentComplete(response) {
          return response.data;
        }
      }
    }

    function deleteDocument(db, collection, document) {
      return $http.delete('/db/' + db + '/' + collection + '/' + JSON.stringify(document, null, '    '))
        .then(deleteDocumentComplete)
        .catch((e) => {
          exception.catcher('XHR failed for deleteDocument')(e);
          return $q.reject(e.data);
        });

      function deleteDocumentComplete(response) {
        return response.data;
      }
    }

    function updateDocument(db, collection, document, documentName) {
      return $http.post('/checkValid', {document: document})
        .then(documentCheckComplete)
        .catch((e) => {
          exception.catcher('XHR failed for checkValid, updateDocument')(e);
          return $q.reject(e.data);
        });

      function documentCheckComplete(response) {
        return $http.put('/db/' + db + '/' + collection + '/' + JSON.stringify(documentName, null, '    '), {document: document})
          .then(updateDocumentComplete)
          .catch((e) => {
            exception.catcher('XHR failed for updateDocument')(e);
            return $q.reject(e.data);
          });

        function updateDocumentComplete(response)  {
          return response.data;
        }
      }
    }
  }
})();