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
.controller('viewTaskController',function viewTaskController($scope, kinvey) {	
	kinvey.getData().then(function(data){
		$scope.data = data.data;
		if($scope.data == null)
		{
			$scope.errorMessage = '<div><h4><center>You have not created any tasks.</center></h4></div>';
		}
	}, function(data){
			$scope.data = data || "Request failed";
	});
	
	$scope.saveTask=function(data,form){	
		console.log('logging');
		if(form.$valid){			
			kinvey.addData(data);				
		}	
		
	}
})
.controller('MyCtrl2',function MyCtrl2() {
	
	});
/*.controller('addTaskController',function addTaskController($scope, kinvey) {
	
	/$scope.saveTask=function(data,form){	
		console.log('logging');
		if(form.$valid){			
			kinvey.addData(data);				
		}	
		
	}
		
}); */