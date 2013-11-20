'use strict';

/* Controllers */

var app = angular.module('rampage.controllers', ['rampage.services']);

app.controller('MyCtrl1', function MyCtrl1($scope, kinvey) {

	kinvey.ping().then(function(data) {
		$scope.data = data.data;
		$scope.status = data.status;
	}, function(data) {
		$scope.data = data || "Request failed";
	});

}).controller('TaskListCtrl', function TaskListCtrl($scope, $log, kinvey) {

		
	$scope.clearNewTaskForm = function(){
			$scope.newTask = {};
	};
	
	$scope.clearNewTaskForm();

	$scope.initList = function(){
		kinvey.allTasks().then(function(response){
			$scope.tasks = response.data;
		}, function(error){
			$scope.tasks = [];	
			$log.error('Error: ' + error);
		});
		};
		
	$scope.initList();	
	
	$scope.cancel = function(){
		$scope.clearNewTaskForm();
	};
	
	$scope.addNewTask = function(){
		$scope.newTask.CreatedDate = (new Date()).getTime();
		kinvey.addTask($scope.newTask).then(function(response)
		{
			$scope.initList();
			$scope.cancel();
			
		},function(error){
				
			$log.error('Error: ' + error);
		});
	
	};
			
});
