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

}).controller('MyCtrl2', 
function($scope, kinvey, $location) {
	kinvey.getTasks().then(function(result){
		$scope.tasks = result.data;
	}, function(data) {
		$scope.data = data || "Request failed";
	});

	$scope.addTask = function(task){
		task.CreatedDate = new Date().getTime();
		kinvey.addTask(task).then(function(result){
			$scope.tasks.push(result.data);
			alert("Success");
		}, function(data){
			alert("Fail");
		});
	};
	$scope.updateTask = function(editTask){
		kinvey.updateTask($scope.editTask).then(function(result){
			$scope.activeTask.Status = result.data.Status;
			$scope.activeTask.Content = result.data.Content;
			//alert("Success");
		}, function(data){
			alert("Fail");
		});
	}

	$scope.setActiveTask = function(task){
		$scope.activeTask = task;
		$scope.editTask = { Status: task.Status, Content : task.Content, _id : task._id };
	}
})