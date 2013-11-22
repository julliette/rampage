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
	
}).controller('MyTasksController', function MyTasksController($scope, kinvey) {
	$scope.myTask = {};
	$scope.myTask.totalTasks = 0;
	$scope.myTask.taskIndex = 0;
	$scope.myTask.offset = 3;

	// count the full task set
	var countTasks = function() {
		kinvey.tasks().countAll(function(data) {
			$scope.myTask.totalTasks = data.count;
		});
	};
	// initialize the count
	countTasks();

	// function to load the tasks based on start index and number to load
	var loadTasks = function(index, offset) {
		$scope.myTask.tasks = kinvey.tasks().query({skip: index, limit: offset}, 
			function() {}, 
			function(error) {
				$scope.messge = "There was an error retrieving your tasks.";
			});
	}
	// initialize the tasks
	loadTasks(0, $scope.myTask.offset);

	// set up a watch on the index, for when the directive changes it
	$scope.$watch('myTask.taskIndex', function(value) {
		loadTasks(value, $scope.myTask.offset);
	});
	
	$scope.getClass = function(dueDate, status) {
		if (status == 'Complete') {
			return 'success';
		} else if (new Date(dueDate) < new Date()) {
			return 'error';
		}
	};
}).controller('TaskController', function TaskController($scope, kinvey, $modal, $q) {
	// initialize values
	$scope.message = "";
	$scope.editing = {};
	$scope.totalTasks = 0;
	$scope.taskIndex = 0;
	$scope.offset = 10;

	// count the full task set
	var countTasks = function() {
		kinvey.tasks().countAll(function(data) {
			$scope.totalTasks = data.count;
		});
	};
	// initialize the count
	countTasks();

	// function to load the tasks based on start index and number to load
	var loadTasks = function(index, offset) {
		$scope.tasks = kinvey.tasks().query({skip: index, limit: offset}, 
			function() {}, 
			function(error) {
				$scope.messge = "There was an error retrieving your tasks.";
			});
	}
	// initialize the tasks
	loadTasks(0, $scope.offset);

	// set up a watch on the index, for when the directive changes it
	$scope.$watch('taskIndex', function(value) {
		loadTasks(value, $scope.offset);
	});
	
	$scope.initEdit = function(task) {
		// copy the existing task, so it doesn't update the UI before it's saved
		if (task) {
			$scope.editing = angular.copy(task);
			$scope.original = task;
		}

		// launch the modal, requires a promise
		var modalPromise = $modal({template: 'partials/task-modal.html', persist: true, show: false, backdrop: 'static', scope: $scope});
		$q.when(modalPromise).then(function(modalEl) {modalEl.modal('show')});
	};
	
	$scope.saveTask = function(task, editing) {
		if (editing._id != undefined) {
			// save the existing task
			editing.$update(function(updatedTask) {
				// replace the old version with this one
				$scope.tasks.splice($scope.tasks.indexOf(task), 1, updatedTask);
				// and clean the models
				cleanUp();
			}, function(error) {
				// on error, show a message
				$scope.message = "Failed to save updated task. Please try again: " + error.status;
			});
		} else {
			// create the new task
			$scope.editing.CreatedDate = new Date().getTime();
			kinvey.tasks().save($scope.editing, function(task) {
				// can't just load it into the list anymore - what if I'm not on the right page?
				// need to go back to the server to get the right list
				// if we're on the first page, we need to force it
				// otherwise we'll do that just by resetting the index back to 0
				if ($scope.taskIndex == 0) {
					loadTasks();
				} else {
					$scope.taskIndex = 0;
				}
				// and re-count
				countTasks();
				// and clean the models
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

	$scope.getClass = function(dueDate, status) {
		if (status == 'Complete') {
			return 'success';
		} else if (new Date(dueDate) < new Date()) {
			return 'error';
		}
	};
});
