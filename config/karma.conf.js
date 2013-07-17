basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'test/lib/jQuery.js',
  'app/lib/angular/angular.js',
  'app/lib/angular/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  'test/lib/bootstrap.js',
  'test/lib/angular-strap.js',
  'app/js/**/*.js',
  'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
