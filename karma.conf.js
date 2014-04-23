// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // files to monitor for coverage
    preprocessors: {
      'app/js/*.js' : 'coverage'
    },

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/es5-shim/es5-shim.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/json3/lib/json3.min.js',
      'app/bower_components/momentjs/moment.js',
      'app/bower_components/angular-momentjs/angular-momentjs.js',
      'app/bower_components/sass-bootstrap/dist/js/bootstrap.js',
      'app/bower_components/angular-strap-sass/dist/angular-strap.min.js',
      'app/bower_components/angular-strap-sass/dist/angular-strap.tpl.min.js',
      'app/js/*.js',
      'app/js/**/*.js',
      'test/mock/**/*.js',
      'test/unit/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // turn on coverage reporting
    reporters: ['coverage'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
