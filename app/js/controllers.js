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
	
.controller('ViewTasksCtrl', function viewTaskCtrl($scope, kinvey) {

	kinvey.viewTasks().then(function(data) {
		$scope.data = data.data;
		console.log(data);
	}, function(data) {
		$scope.data = data || "Request failed";
	});
})

.controller('MyCtrl2', [
function() {

}]); 