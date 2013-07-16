'use strict';

/* Controllers */

angular.module('rampage.controllers', ['rampage.services'])
.controller('MyCtrl1', function MyCtrl1($scope, kinvey) {

	kinvey.ping().then(function(data) {
		$scope.data = data.data;
		$scope.status = data.status;
		//$scope.tasks = data;
	}, function(data) {
		$scope.data = data || "Request failed"; });
			

}).controller('MyCtrl2',function MyCtrl2($scope, kinvey) {
	//Service call to retrieve data from Kinvey service
	kinvey.getData().then(function(data){
		$scope.tasks = data.data;
		$scope.hasData = false;
		$scope.message = "No tasks are present";
		if ($scope.tasks.length > 0){
			console.log("null");
			$scope.hasData = true;
		}
	});
})

 .controller('MyCtrl3', 
function() {

});