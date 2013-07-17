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
	
}).controller('MyCtrl2', function MyCtrl2() {
}).controller('TaskController', function TaskController($scope, kinvey) {
	$scope.message = "";

	$scope.tasks = kinvey.tasks().query(
		function() {}, 
		function(error) {
			$scope.message = "There was an error retrieving your tasks."
	});
	
}); 