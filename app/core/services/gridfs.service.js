(() => {
  angular
    .module('app')
    .factory('GridfsService', GridfsService);

  function GridfsService($http) {
    let service = {
      addFile: addFile,
      deleteFile: deleteFile
    };

    return service;

    function addFile(db, bucket, file) {
      let fd = new FormData();
      fd.append('file', file);

      return $http.post('/db/' + db + '/gridFS/' + bucket + '/', fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
        .then(addFileComplete)
        .catch((e) => {
          exception.catcher('XHR failed for addFile')(e);
          return $q.reject(e.data);
        });

      function addFileComplete(response) {
        return response.data;
      }
    }

    function deleteFile(db, bucket, file) {
      return $http.delete('/db/' + db + '/gridFS/' + bucket + '/' + JSON.stringify(file, null, '    '))
        .then(deleteFileComplete)
        .catch((e) => {
          exception.catcher('XHR failed for deleteFile')(e);
          return $q.reject(e.data);
        });

      function deleteFileComplete(response) {
        return response.data;
      }
    }
  }
})();