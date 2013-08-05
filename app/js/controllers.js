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

}).controller('TaskController', function MyCtrl2($scope, kinvey) {

	// get the data, if data is returned extract the number of rows
	// then assign the return value to tasks
	$scope.tasksFound = "";
	kinvey.getTasks().then(function(data){
		$scope.tasks = data.data
		if ($scope.tasks.length > 0){
			//console.log("Tasks are present");
			$scope.taskCount = $scope.tasks.length;
			$scope.tasks = data.data;
			$scope.tasksFound = true;
		}
	}, function(error) {
		$scope.errorMessage = "Kinvey Task Request Failes"; 
	});

}
); 