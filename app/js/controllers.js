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
function($scope, kinvey, $location) {
	kinvey.getTasks("/Task?query={}&sort={'CreatedDate': -1}").then(function(data){
		$scope.tasks = data.data;
	}, function(data) {
		$scope.data = data || "Request failed";
	});

	$scope.addTask = function(task){
		task.CreatedDate = new Date().getTime();
		kinvey.addTask("/Task",task).then(function(data){
			alert("Success");
		}, function(data){
			alert("Fail");
		});
	}

})