'use strict';

/* Controllers */

angular.module('rampage.controllers', ['rampage.services'])
.controller('MyCtrl1', function MyCtrl1($scope, kinvey) {

	kinvey.ping().then(function(data) {
		$scope.data = data.data;
		$scope.status = data.status;
	}, function(data) {
		$scope.data = data || "Request failed"; });
			

}).controller('MyCtrl2',function MyCtrl2($scope, kinvey) {
	//Service call to retrieve data from Kinvey service
	$scope.message = "";
		
	kinvey.getData().then(function(data){
		$scope.tasks = data.data;
		$scope.message = "No tasks are present";
		if ($scope.tasks.length > 0){
			console.log("Tasks are present");
			$scope.hasData = true;
		}
	})
	
	$scope.createTask = function(newTask){
		//console.log('post data');
		var date = new Date();
		var dateInMilliseconds = date.getTime();
		var jsonTask = {
			Content: newTask.Content,
			Status: newTask.Status,
			CreatedDate: dateInMilliseconds  
		};
		kinvey.postData(jsonTask);
		window.alert('The task ' + jsonTask.Content + ' has been saved!');
		$scope.showOverlay = false;
		//$route.reload();
		//location.reload(false);
	}
	
	$scope.refreshPage = function() {
		console.log("Refresh page");
		browser().navigateTo('#/viewTasks');
	}
	
	
}).controller('MyCtrl3', function() {

});