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
function($scope, kinvey, $location, GLOBAL_CONFIG, $route, taskCount) {
	$scope.pageNumber = $route.current.params.pageNumber - 0;
	console.log("param1 :", $route.current.params.param1);
	$scope.count = taskCount.data.count;
	$scope.itemsPerPage = GLOBAL_CONFIG.itemsPerPage;
	$scope.pageCount = Math.ceil($scope.count/GLOBAL_CONFIG.itemsPerPage);

	$scope.pagelink = function(x){
		return '#/view2/' + $scope.pageNumber + '?' + x.name + '=' + x.value;
	};
	
	kinvey.getTasksPage(GLOBAL_CONFIG.itemsPerPage, ($scope.currentPage - 1) * GLOBAL_CONFIG.itemsPerPage)
	.then(function(result){
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