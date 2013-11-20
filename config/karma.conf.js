module.exports = function (config) {
	config.set({
		basePath : '../',

		frameworks : ["jasmine"],

		files : [
		'app/lib/angular/angular.js',
		'app/lib/angular/angular-*.js',
		'test/lib/angular/angular-mocks.js',
		'app/js/**/*.js',
		'test/unit/**/*.js'
		],

		autoWatch : true,

		browsers : ['Chrome'],

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
