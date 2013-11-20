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
		$scope.message=data.data.length==0?"No Tasks":"";
		$scope.tasks = data.data;
		
	}, function(data) {
		$scope.data = data || "Request failed";
	});
	
	$scope.add = function() {
    	$('#popup').removeClass('hidden');
    	$('#popup').addClass('overlay');
    	var content = $scope.content;
    	var status = $scope.status;
    	$scope.status = $scope.content = "";
    	$scope.title="Add Task";
 	};
	
	$scope.edit = function(task) {
    	$('#popup').removeClass('hidden');
    	$('#popup').addClass('overlay');
    	$scope.title="Edit Task";
    	$scope.status = $scope.list;
    	console.log(task);
 	};
 	
 	$scope.cancel = function() {
    	$('#popup').removeClass('overlay');
    	$('#popup').addClass('hidden');
    	$scope.status = $scope.content = "";
 	};
 	
 	$scope.save = function() {
    	console.log($scope.tasks);
    	var content = $scope.task.Content;
		$scope.errorContent = content==""?"*required":"";
		console.log($scope.task);
    	var status = $scope.status;
		$scope.errorStatus = status==""?"*required":"";
		
    	if(content!="" && status!=""){
    		$('#popup').removeClass('overlay');
    		$('#popup').addClass('hidden');
    	}
 	};
})


.controller('AddTaskCtrl', [
function() {

}]);