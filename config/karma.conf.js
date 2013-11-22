module.exports = function (config) {
	config.set({
		basePath : '../',

		frameworks : ["jasmine"],

		files : [
		'test/lib/jQuery.js',
		'app/lib/angular/angular.js',
		'app/lib/angular/angular-*.js',
		'test/lib/angular/angular-mocks.js',
		'test/lib/bootstrap.js',
		'test/lib/angular-strap.js',
		'app/js/**/*.js',
		'test/unit/**/*.js'
		],

		autoWatch : true,

		browsers : ['PhantomJS'],

		preprocessors :  {
			'src/partials/*.html': 'html2js'
		},

		reporters: ['progress', 'junit'],
		
		singleRun: false,

		logLevel: config.LOG_ERROR,

		junitReporter : {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		}
	});
}
