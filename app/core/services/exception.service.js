(() => {
  angular
    .module('app')
    .factory('exception', exception);

  function exception() {
    let service = {
      catcher: catcher
    };

    return service;

    function catcher(message) {
      return (reason) => { console.log(message, reason); }
    }
  }
})();