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

.controller('newCtrl', function newCtrl($scope, kinvey) {
	
	//Creates a task buy using a button click
//	$scope.addTask = function(){

		kinvey.saveTask().then(function(funContent, funStatus){
			//If data was successful we will hide the div
			$scope.content = funContent;
			$scope.status = funStatus;
		}, function(data) {
			//if not show an error message
			alert('Unable to create new task');
			
			$scope.tasks = data || "Request failed";
		});
	
//	};
	
})
.controller('detailsCtrl', function detailsCtrl($scope, kinvey, $routeParams){
	


})
.controller('editCtrl', function editCtrl($scope, kinvey) {
	$scope.editTask = function(){
		kinvey.editTask().then(function(data){
		
		}, function(data) {
			$scope.tasks = data || "Request failed";
		});
	
	
	};
	
}); 