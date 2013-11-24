'use strict';

/* Controllers */

angular.module('rampage.controllers', ['rampage.services'])
.controller('MyCtrl1', function MyCtrl1($scope, kinvey) {

	kinvey.ping().then(function(data) {
		$scope.data = data.data;
		$scope.status = data.status;
	}, function(data) {
		$scope.data = data || "Request failed";
	});
})
	
.controller('ViewTasksCtrl', function ViewTasksCtrl($scope, kinvey) {

	kinvey.viewTasks().then(function(data) {
		$scope.tasks = data.data;
	}, function(data) {
		$scope.data = data || "Request failed";
	});
})

.controller('AddNewTaskCtrl', function ViewTasksCtrl($scope, kinvey) {

	kinvey.viewTasks().then(function(data) {
		$scope.tasks = data.data;
	}, function(data) {
		$scope.data = data || "Request failed";
	});
})

; 