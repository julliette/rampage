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

}).controller('TaskListCtrl', function TaskListCtrl($scope, kinvey) {

	kinvey.allTasks().then(function(response){
		
		$scope.tasks = response.data;

		
	}, function(error){
		console.log('Error: ' + error);
	});
	
	
});
