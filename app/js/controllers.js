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
	
}).controller('MyCtrl2', function MyCtrl2() {
}).controller('TaskController', function TaskController($scope, kinvey) {
	$scope.message = "";

	$scope.tasks = kinvey.tasks().query(
		function() {}, 
		function(error) {
			$scope.message = "There was an error retrieving your tasks."
	});
	
	$scope.saveTask = function(task) {
		if (task._id != undefined) {
			// save the existing task
			task.$update(function() {}, function(error) {
				// on error, show a message
				$scope.message = "Failed to save updated task. Please try again: " + error.status;
			});
		} else {
			// create the new task
			var taskResource = kinvey.tasks();
			var newTask = new taskResource();
			newTask.Content = task.Content;
			newTask.Status = task.Status;
			newTask.CreatedDate = new Date().getMilliseconds();
			newTask.$save(function(task) {
				// on success, add it into the collection
				$scope.tasks.push(task);
			}, function(error) {
				// on error, show a message on the main screen
				$scope.message = "Failed to create new task. Please try again: " + error.status;
			});
		}
	};
	
});
