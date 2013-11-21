'use strict';

// Declare app level module which depends on filters, and services
angular.module('rampage', ['rampage.filters', 'rampage.services', 'rampage.directives', 'rampage.controllers']).config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl : 'partials/home.html',
		controller : 'homeCtrl'
	});
	$routeProvider.when('/details/:task_Id', {
		templateUrl : 'partials/details.html',
		controller : 'detailsCtrl'
	});
	$routeProvider.when('/new', {
		templateUrl : 'partials/new.html',
		controller : 'newCtrl'
	});
	
	// $routeProvider.otherwise({
	// 	redirectTo : '/home'
	// });
}]);

angular.module('rampage').factory('SERVICE_URL', [
function() {
		return 'http://baas.kinvey.com/appdata/kid_Te0iCbYsYf';
	}
]);

