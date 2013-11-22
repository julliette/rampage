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
		
		$scope.newTask = new Task();
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
	  };
	    
	    $scope.saveTask = function(){
	    	
	    	var bIsNew =!$scope.newTask._id; 
	    	if(bIsNew){
	    		//Create new
	    		$scope.newTask.CreatedDate = (new Date()).getTime();
			
			
			kinvey.addTask($scope.newTask.Dehydrate()).then(function(response)
				{
					
					$scope.tasks.push(response.data);
					$scope.cleanUp();
					
				},function(error){
						
					$log.error('Error: ' + error);
				});

			}
			else{
				// Edit
				
				kinvey.editTask($scope.newTask).then(function(response)
				{
					
					// Find the task index
					for(var i = 0; i<$scope.tasks.length;i++){
						if($scope.tasks[i]._id == response.data._id){
							
							$scope.tasks[i] = response.data;
							break;
						}
						
					}
					
					$scope.cleanUp();
					
				},function(error){
						
					$log.error('Error: ' + error);
				});

				
			}			
	    };
	    
	    $scope.cancelSaveTaskDialog= function(){
	    	$scope.cleanUp();
	    };
	    
	    $scope.cleanUp = function(){
	    	
			$scope.newTask = new Task();//{};	    	
	    
	    };
	   

	
	$scope.editTask = function(task){
		
		
		 var modalPromise= $modal({
	      template: 'partials/TaskDetails.html',persist:true,
	      show:false,
	      backdrop:'static',
	      scope:$scope
	     
	    });
	
	    $q.when(modalPromise).then(function (modalElement){
			
					$scope.newTask = new Task(task);//$.extend(true, {}, task);	 		
					modalElement.modal('show');
					});
	   
			
	    };
	    
	    $scope.cancelSaveTaskDialog= function(){
	    	$scope.cleanUp();
	    };
	    
	   
	
});
