'use strict';

/* Controllers */

angular.module('rampage.controllers', ['rampage.services'])
.controller('MyCtrl1', function MyCtrl1($scope, kinvey) {

	kinvey.ping().then(function(data) {
		$scope.data = data.data;
		$scope.status = data.status;
	}, function(error) {
		$scope.data = error || "Ping request failed"; });
			

}).controller('TasksController',function TasksController($scope, kinvey) {
	//Service call to retrieve data from Kinvey service
	$scope.message = "No tasks are present";
	$scope.hasData = "";
	$scope.errorMesssage = "";
		
	kinvey.getData().then(function(data){
		
		$scope.tasks = data.data;		
		if ($scope.tasks.length > 0){
			//console.log("Tasks are present");
			$scope.hasData = true;
		}
	}, function(error) {
		$scope.errorMessage = "Get Tasks Request failed"; 
	});	
	
	$scope.createTask = function(newTask){
		//console.log('post data');
		var dateInMilliseconds = new Date().getTime();
		$scope.newTask.CreatedDate = dateInMilliseconds;
		var jsonTask = {
			Content: newTask.Content,
			Status: newTask.Status,
			CreatedDate: dateInMilliseconds  
		};
		kinvey.postData(jsonTask);
		$scope.tasks.push(newTask);
		window.alert('The task ' + jsonTask.Content + ' has been saved!');
		$scope.hideOverlay();
	}, function(error) {
		$scope.errorMessage = "Post task request failed, task could not be saved";
	}
	
	$scope.editTask = function(oldTask){
		//window.alert(oldTask.Content);
	}
	
	$scope.deleteTask = function(task){
		//window.alert(task.Content);
	}
	
	$scope.displayOverlay = function() {
		document.getElementById("newTaskForm").reset();
		$scope.showOverlay = true;
	}
	
	$scope.hideOverlay = function() {
		$scope.showOverlay = false;
	}
	
	
}).controller('MyCtrl3', function() {

});