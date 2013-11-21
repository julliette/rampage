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

})
.controller('MyCtrl2', [
function() {

}])

.controller('TaskListCtrl', function TaskListCtrl($scope, kinvey) {
	kinvey.task().then(function(data) {
		$scope.tasks = data.data;
	}, function(data) {
		$scope.data = data || "Request failed";
	});
	
	$scope.add = function() {
    	$('#popup').removeClass('hidden');
    	$('#popup').addClass('overlay');
    	$scope.clearpopup();
    	$scope.title="Add Task";
 	};
	
	$scope.edit = function(task) {
    	$('#popup').removeClass('hidden');
    	$('#popup').addClass('overlay');
    	$scope.title="Edit Task";
    	$scope.content = task.Content;
    	$scope.status = task.Status;
    	$scope._id = task._id;
    	$scope.createddate = task.CreatedDate;
 	};
 	
 	$scope.cancel = function() {
    	$('#popup').removeClass('overlay');
    	$('#popup').addClass('hidden');
    	$scope.clearpopup();
 	};
 	
 	$scope.save = function() {
 		console.log($scope);
    	kinvey.edittask($scope).then(function() {
			alert("Task Saved");
    		$('#popup').removeClass('overlay');
    		$('#popup').addClass('hidden');
		});
		$scope.refreshList();
 	};
 	
 	$scope.addtask = function() {
 		
		kinvey.createtask($scope).then(function() {
			alert("Task Added");
			$scope.refreshList();
    		$('#popup').removeClass('overlay');
    		$('#popup').addClass('hidden');
		});
 	};
 	
 	$scope.clearpopup= function(){
    	$scope.status = $scope.content = "";
 	};
 	
 	$scope.refreshList=function(){
 		kinvey.task().then(function(data) {
			$scope.tasks = data.data;
		});
 	};
})


.controller('AddTaskCtrl', [
function() {

}]);