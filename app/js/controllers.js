'use strict';

/* Controllers */

angular.module('rampage.controllers', ['rampage.services'])

.controller('homeCtrl', function MyCtrl1($scope, kinvey) {

	kinvey.ping().then(function(data) {
		$scope.data = data.data;
		$scope.status = data.status;
	}, function(data) {
		$scope.data = data || "Request failed";
	});
	
	kinvey.listTasks().then(function(data){
		$scope.tasks = data.data;
		$scope.status = data.status;
	}, function(data) {
		$scope.tasks = data || "Request failed";
	});
})

.controller('newCtrl', function newCtrl($scope, kinvey,$location) {
	
	$scope.hide = function(){
			$location.path("#/home");
		};
	
	//Creates a task buy using a button click
	$scope.addTask = function(task){
		kinvey.saveTask(task.Content, task.Status).then(function(){
			//If data was successful we will hide the div
		}, function(data) {
			//if not show an error message
			alert('Unable to create new task');	
			$scope.tasks = data || "Request failed";
		});
	};
	
})
.controller('detailsCtrl', function detailsCtrl($scope, kinvey, $routeParams, $location){
	
		$scope.hide = function(){
			$location.path("#/home");
		};
		var taskId=$routeParams.task_Id;
		
		$scope.updateTask = function(task){		
			kinvey.editTask(task).then(function(data){
				
			}, function(error){
				alert("Oopps.. error: find google");
			});
		};

		$scope.deleteTask = function(task){
			var taskId= task._id;
			if(confirm("Do you want to delete taks: "+task.Content)){
				kinvey.deleteTask(taskId).then(function(data){
					
				}, function(error){
					alert("Unable to delete task");
				});
			}
		};

		kinvey.viewTask(taskId).then(function(data){
			$scope.task = data.data;

		});

});
