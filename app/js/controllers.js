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
}).controller('TaskController', function TaskController($scope, kinvey, $modal, $q) {
	$scope.message = "";
	$scope.editing = {};

	$scope.tasks = kinvey.tasks().query(
		function() {}, 
		function(error) {
			$scope.message = "There was an error retrieving your tasks."
	});
	
	$scope.initEdit = function(task) {
		if (task) {
			$scope.editing = angular.copy(task);
			$scope.original = task;
		}
		var modalPromise = $modal({template: 'partials/task-modal.html', persist: true, show: false, backdrop: 'static', scope: $scope});
		$q.when(modalPromise).then(function(modalEl) {modalEl.modal('show')});
	};
	
	$scope.saveTask = function(task, editing) {
		if (editing._id != undefined) {
			// save the existing task
			editing.$update(function(updatedTask) {
				// replace the old version with this one
				$scope.tasks.splice($scope.tasks.indexOf(task), 1, updatedTask);
				cleanUp();
			}, function(error) {
				// on error, show a message
				$scope.message = "Failed to save updated task. Please try again: " + error.status;
			});
		} else {
			// create the new task
			$scope.editing.CreatedDate = new Date().getTime();
			kinvey.tasks().save($scope.editing, function(task) {
				// on success, add it into the collection
				$scope.tasks.push(task);
				cleanUp();
			}, function(error) {
				// on error, show a message on the main screen
				$scope.message = "Failed to create new task. Please try again: " + error.status;
			});
		}
	};
	
	$scope.cancelEdit = function() {
		cleanUp();
	};
	
	var cleanUp = function() {
		$scope.editing = {};
		$scope.original = {};
	}
});
