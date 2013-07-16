'use strict';

// Declare app level module which depends on filters, and services
angular.module('rampage', ['rampage.filters', 'rampage.services', 'rampage.directives', 'rampage.controllers']).config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/view1', {
		templateUrl : 'partials/partial1.html',
		controller : 'MyCtrl1'
	});
	$routeProvider.when('/view2', {
		templateUrl : 'partials/partial2.html',
		controller : 'MyCtrl2'
	});
	$routeProvider.otherwise({
		redirectTo : '/view1'
	});
}], function($httpProvider) {

	// Use x-www-form-urlencoded Content-Type
	$httpProvider.defaults.headers.common['Authorization'] = 'Basic kid_Te0iCbYsYf:f04cfc15db08416e8d6db3094d0160b0';
	$httpProvider.defaults.headers.common['X-Kinvey-API-Version'] = '3';

});

angular.module('rampage').factory('SERVICE_URL', [
function() {
		return 'http://baas.kinvey.com/appdata/kid_Te0iCbYsYf';
	}
]);

