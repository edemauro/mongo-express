module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'public/javascripts/jquery-2.1.4.min.js',
      'public/bower_components/angular/angular.js',
      'public/bower_components/codemirror/lib/codemirror.js'
      'public/bower_components/angular-mocks/angular-mocks.js',
      'public/bower_components/angular-bootstrap/ui-bootstrap.js',
      'public/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'public/bower_components/angular-ui-codemirror/ui-codemirror.js',
      'public/bower_components/angular-ui-router/release/angular-ui-router.js',
      'public/angular/core/**/*.js'
    ],

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ['Chrome'],

    singleRun: true
  });
}