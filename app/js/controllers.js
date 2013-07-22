'use strict';

/* Controllers */

angular.module('rampage.controllers', ['rampage.services'])
.controller('MyCtrl1', function MyCtrl1($scope, kinvey) {

	kinvey.ping().then(function(data) {
		$scope.data = data.data;
		$scope.status = data.status;
	}, function(error) {
		$scope.data = error || "Ping request failed"; });
			

}).controller('TaskController',function TaskController($scope, kinvey) {
	//Service call to retrieve data from Kinvey service
	$scope.message = "No tasks are present";
	$scope.hasData = "";
	$scope.errorMesssage = "";
	$scope.newTask = {
		_id : "",
		Content: "",
		Status: ""
	};
		
	kinvey.getData().then(function(data){
		
		$scope.tasks = data.data;		
		if ($scope.tasks.length > 0){
			//console.log("Tasks are present");
			$scope.hasData = true;
		}
	}, function(error) {
		$scope.errorMessage = "Get Tasks Request failed"; 
	});	
	
	$scope.saveTask = function(task){
		//console.log('post data');
		if(task._id){
			var updatedTask = {
				_id: task._id,
				Content: task.Content,
				Status: task.Status,
				CreatedDate: task.CreatedDate,  
			};
			kinvey.putData(updatedTask);
		}
		else {
			var dateInMilliseconds = new Date().getTime();
			var newJsonTask = {
				Content: task.Content,
				Status: task.Status,
				CreatedDate: dateInMilliseconds  
			};
			console.log(newJsonTask);
			kinvey.postData(newJsonTask);
			$scope.tasks.push(task);
			window.alert('The task ' + newJsonTask.Content + ' has been saved!');
		}
		$scope.hideOverlay();
	}, function(error) {
		$scope.errorMessage = "Post task request failed, task could not be saved";
	}
	
	$scope.editTask = function(oldTask){
		//window.alert(oldTask.Content);
		$scope.newTask = oldTask;
		$scope.displayOverlay('edit task');
	}
	
	$scope.deleteTask = function(task){
		//window.alert(task.Content);
	}
	
	$scope.displayOverlay = function(mode) {
		if(mode == 'add task'){
			$scope.newTask._id = "";
			//document.getElementById("newTaskForm").reset();
		}
		$scope.showOverlay = true;
	}
	
	$scope.hideOverlay = function() {
		$scope.showOverlay = false;
	}
	
	
}).controller('MyCtrl3', function() {

});