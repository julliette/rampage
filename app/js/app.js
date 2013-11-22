'use strict';

// Declare app level module which depends on filters, and services
angular.module('rampage', ['rampage.filters', 'rampage.services', 'rampage.directives', 'rampage.controllers']).config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/view1', {
		templateUrl : 'partials/partial1.html',
		controller : 'MyCtrl1'
	});
	$routeProvider.when('/view2/:pageNumber', {
		templateUrl : 'partials/partial2.html',
		controller : 'MyCtrl2',
		resolve: {
			taskCount : function(kinvey)
			{
				return kinvey.countTask();
			}
		}
	});
	$routeProvider.when('/view2', {
		redirectTo : '/view2/1'
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

angular.module('rampage').factory('GLOBAL_CONFIG', [
function() {
		return {itemsPerPage : 10}
	}
]);

