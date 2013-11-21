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

}).controller('TaskListCtrl', function TaskListCtrl($scope, $log, $modal, $q,kinvey) {


	$scope.initList = function(){
		kinvey.allTasks().then(function(response){
			$scope.tasks = response.data;
		}, function(error){
			$scope.tasks = [];	
			$log.error('Error: ' + error);
		});
		};
		
	$scope.initList();	
	
	
	$scope.addNewTask = function(){
		
		
		 var modalPromise= $modal({
	      template: 'partials/TaskDetails.html',persist:true,
	      show:false,
	      backdrop:'static',
	      scope:$scope
	     
	    });
	
	    $q.when(modalPromise).then(function (modalElement){
	    		modalElement.modal('show');
	    	
	    });
	    
	    
	    $scope.saveTask = function(){
	    	$scope.newTask.CreatedDate = (new Date()).getTime();
			
			kinvey.addTask($scope.newTask).then(function(response)
				{
					//$scope.initList();
					//$scope.cancel();
					$scope.tasks.push(response.data);
					$scope.cleanUp();
					
				},function(error){
						
					$log.error('Error: ' + error);
				});
			
	    };
	    
	    $scope.cancelSaveTaskDialog= function(){
	    	$scope.cleanUp();
	    };
	    
	    $scope.cleanUp = function(){
	    	
			$scope.newTask = {};	    	
	    
	    };
	   /* $q.when(modalPromise).then(function (newTask) {
	    	
		    	newTask.CreatedDate = (new Date()).getTime();
				kinvey.addTask($scope.newTask).then(function(response)
				{
					$scope.initList();
					$scope.cancel();
					
				},function(error){
						
					$log.error('Error: ' + error);
				});
				
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
		
		*/
	/*	var ModalInstanceCtrl = function ($scope, $modalInstance, item) {

		  $scope.item = item;
		  
		
		  $scope.ok = function () {
		    $modalInstance.close($scope.item);
		  };
		
		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		 };
};*/
	
	};

	
	$scope.editTask = function(id){
		
		
		 var modalPromise= $modal({
	      template: 'partials/TaskDetails.html',persist:true,
	      show:false,
	      backdrop:'static',
	      scope:$scope
	     
	    });
	
	    $q.when(modalPromise).then(function (modalElement){
			kinvey.getTask(id).then(function(response)
					{
						$scope.newTask = response.data;						
					},function(error){
							
						$log.error('Error: ' + error);
					});
	    	
	    	modalElement.modal('show');
	    	
	    });
	    
	    
	    $scope.saveTask = function(){
	    	$scope.newTask.CreatedDate = (new Date()).getTime();
			
			kinvey.addTask($scope.newTask).then(function(response)
				{
					//$scope.initList();
					//$scope.cancel();
					$scope.tasks.push(response.data);
					$scope.cleanUp();
					
				},function(error){
						
					$log.error('Error: ' + error);
				});
			
	    };
	    
	    $scope.cancelSaveTaskDialog= function(){
	    	$scope.cleanUp();
	    };
	    
	    $scope.cleanUp = function(){
	    	
			$scope.newTask = {};	    	
	    
	    };	
	};
	
});
