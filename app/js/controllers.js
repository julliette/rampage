'use strict';

/* Controllers */

angular.module('rampage.controllers', ['rampage.services'])

.controller('homeCtrl', function MyCtrl1($scope, kinvey) {


	//Deals with pagination
	$scope.filteredTodos =[]
	, $scope.currentPage =1
	, $scope.numPerPage  = 10
	, $scope.maxSize 	 =5;

	
	$scope.numPages = function () {
    	return Math.ceil($scope.tasks.length / $scope.numPerPage);
  	};


	kinvey.ping().then(function(data) {
		$scope.data = data.data;
		$scope.status = data.status;
	}, function(data) {
		$scope.data = data || "Request failed";
	});

	kinvey.getUsers().then(function(data){
		// console.log("get users data:");
		// console.log(data.data[0].FirstName);
		$scope.Users= data.data;
	},function(error){
		$scope.data = data || "Could not get List of Owners";
	});	
	
	kinvey.listTasks().then(function(data){
		$scope.tasks = data.data;
		$scope.status = data.status;

	}, function(data) {
		$scope.tasks = data || "Request failed";
	});


})

.controller('newCtrl', function newCtrl($scope, kinvey,$location) {
	$scope.Users = null;
	$scope.selectedValue= null;
	$scope.hide = function(){
			$location.path("#/home");
		};
	
	function isDateValid(TaskDueDate){
	
			if(!TaskDueDate){
				//Return true if it is null or undefined
				//One of the criteria is that it can be null.. in that way we want to return true.
				return true;
			}
			var today = new Date();
			var formattedDate = today.getTime();

			var date = new Date(TaskDueDate);
			date = date.getTime();

			if(date < formattedDate){
				return false;	
			}else{
			
				return true;
			}
		};

	function getUsers(){
		kinvey.getUsers().then(function(data){
			$scope.Users= data.data;

		},function(error){


		});	
	}

	getUsers();

	//Creates a task buy using a button click
	$scope.addTask = function(task){
			
			if(!task.DueDate){

			}else if(!isDateValid(task.DueDate)){
			//if the date is less than today then
				alert("Unable to create task as due date is invalid.");
				return false;
			}

		//Add selectedValue to the task variable
		task.User= $scope.selectedValue;
		kinvey.saveTask(task).then(function(){

		}, function(data) {
			//if not show an error message
			alert('Unable to create new task');	
			$scope.tasks = data || "Request failed";
		});
	};
	
})
.controller('detailsCtrl', function detailsCtrl($scope, kinvey, $routeParams, $location){
		$scope.Users = null;
		$scope.selectedValue= null;
		$scope.hide = function(){
			$location.path("#/home");
		};
		

		var taskId=$routeParams.task_Id;
		
		 function isDateValid(TaskDueDate){
	
			if(!TaskDueDate){
				//Return true if it is null or undefined
				//One of the criteria is that it can be null.. in that way we want to return true.
				return true;
			}

			$scope.selectedValue = TaskDueDate.User;

			var today = new Date();
			var formattedDate = today.getTime();

			var date = new Date(TaskDueDate);
			date = date.getTime();

			if(date < formattedDate){
				
				return false;
			
			}else{
			
				return true;
			}
		};

		// function getUsers(){
			kinvey.getUsers().then(function(data){
				$scope.Users= data.data;
			},function(error){


			});	
		// }

		// getUsers();


		$scope.updateTask = function(task){	
			//if the date is less than today then
			if(!isDateValid(task.DueDate)){
				alert("Invalid due date. Select a date not in the past");
				return false;
			}
			task.User = $scope.selectedValue;

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
			$scope.selectedValue = $scope.task.User;
		});

});
