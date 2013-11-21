'use strict';

// Declare app level module which depends on filters, and services
angular.module('rampage', ['rampage.filters', 'rampage.services', 'rampage.directives', 'rampage.controllers','$strap.directives']).config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/view1', {
		templateUrl : 'partials/partial1.html',
		controller : 'MyCtrl1'
	});
	$routeProvider.when('/Tasks', {
		templateUrl : 'partials/TaskList.html',
		controller : 'TaskListCtrl'
	});
	$routeProvider.otherwise({
		redirectTo : '/Tasks'
	});
}]);

angular.module('rampage').factory('SERVICE_URL', [
function() {
		return 'http://baas.kinvey.com/appdata/kid_Te0iCbYsYf';
	}
]);

