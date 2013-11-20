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

}).controller('MyCtrl2', [
function() {

}])

.controller('TaskListCtrl', function TaskListCtrl($scope, kinvey) {
	kinvey.task().then(function(data) {
		$scope.message=data.data.length==0?"No Tasks":"";
		$scope.tasks = data.data;
	}, function(data) {
		$scope.data = data || "Request failed";
	});
	
	$scope.edit = function() {
    	alert("Test!");
 	};
 	
 	$scope.cancel = function() {
    	$('#popup').removeClass('overlay');
    	$('#popup').addClass('hidden');
 	};
 	
 	
 	$scope.add = function () {

    };
})


.controller('AddTaskCtrl', [
function() {

}]);