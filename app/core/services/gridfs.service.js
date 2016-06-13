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
      const fd = new FormData();
      fd.append('file', file);

      return $http.post('/db/' + db + '/gridFS/' + bucket + '/', fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
        .then(addFileComplete);

      function addFileComplete(response) {
        return response;
      }
    }

    function deleteFile(db, bucket, file) {
      return $http.delete('/db/' + db + '/gridFS/' + bucket + '/' + JSON.stringify(file, null, '    '))
        .then(deleteFileComplete);

      function deleteFileComplete(response) {
        return response;
      }
    }
  }
})();