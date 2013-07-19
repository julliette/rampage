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
	
	$scope.changeHeader = function(){
		$scope.taskHeader = 'Add Task';	
		document.getElementById('newTaskForm').reset();
		   		
	};
	
$scope.saveTask = function(data,form)
	{	
		
		var date= new Date();		
		var modJson= {Content:data.Content, Status:data.Status, CreatedDate:date.getTime()};
		//console.log('logging');
		if(form.$valid)
		{		
			if(data._id != null){
				var updatedJson= {_id:data._id, Content:data.Content, Status:data.Status, CreatedDate:date.getTime()};
				
				kinvey.updateData(updatedJson).success(function(data, status){
					window.alert("Task updated.");
					document.getElementById('newTaskForm').reset();     
				}).error(function(data, status){
					window.alert("Task wasn't saved please try again.");
				});
			}	
			else{			
				window.alert("new");
					kinvey.addData(modJson).success(function(data, status) {
					$scope.data.push(data);
      				window.alert("Task saved."); 
      				document.getElementById('newTaskForm').reset();    			
    		 		}).error(function(data, status) {
    		 		//add error message here
    		 		window.alert("Task wasn't saved please try again.");
    		 	});
		 	}    		 	
    	}
	};
	
	$scope.editTask = function(data){
		$scope.taskHeader = 'Edit Task';
		$scope.task = data;		
	};

})
.controller('MyCtrl2',function MyCtrl2() {
	
	});
