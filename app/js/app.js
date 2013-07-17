'use strict';

// Declare app level module which depends on filters, and services
angular.module('rampage', ['rampage.filters', 'rampage.services', 'rampage.directives', 'rampage.controllers', '$strap.directives']).config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/view1', {
		templateUrl : 'partials/partial1.html',
		controller : 'MyCtrl1'
	});
	$routeProvider.when('/view2', {
		templateUrl : 'partials/partial2.html',
		controller : 'MyCtrl2'
	});
	$routeProvider.when('/tasks', {
		templateUrl : 'partials/taskList.html',
		controller : 'TaskController'
	});
	$routeProvider.otherwise({
		redirectTo : '/view1'
	});
}]);

angular.module('rampage').factory('SERVICE_URL', [
function() {
		return 'http://baas.kinvey.com/appdata/kid_Te0iCbYsYf';
	}
]);

