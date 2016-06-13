(() => {
  angular
    .module('app')
    .directive('fileInput', fileInput);

  function fileInput($parse) {
    return {
      restrict: 'A',
      link: link
    }

    function link(scope, elem, attrs) {
      elem.bind('change', onChange);

      function onChange() {
        const model = $parse(attrs.fileInput);
        const modelSetter = model.assign;

        scope.$apply(() => {
          modelSetter(scope, elem[0].files[0])
        });
      }
    }
  }
})();