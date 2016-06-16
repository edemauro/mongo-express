(function(window) {
  'use strict';
  
  window.FakeModal = function FakeModal($q){
    this.resultDeferred = $q.defer();
    this.result = this.resultDeferred.promise;
  }
    
  FakeModal.prototype = {
    close: function (item) {
      this.resultDeferred.resolve(item);
    },
    dismiss: function (item) {
      this.resultDeferred.reject(item);
    }
  }
})(window);