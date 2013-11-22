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
.controller('MyCtrl2', [
function() {

}])

.controller('TaskListCtrl', function TaskListCtrl($scope, kinvey) {

    $scope.itemsPerPage = 10;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
	kinvey.task().then(function(data) {
		$scope.tasks = data.data;
		$scope.groupToPages();
	}, function(data) {
		$scope.data = data || "Request failed";
	});
	
	
	$scope.add = function() {
    	$('#popup').removeClass('hidden');
    	$('#popup').addClass('overlay');
    	$scope.clearpopup();
    	$scope.title="Add Task";
 	};
	
	$scope.edit = function(task) {
    	$('#popup').removeClass('hidden');
    	$('#popup').addClass('overlay');
    	$scope.title="Edit Task";
    	$scope.content = task.Content;
    	$scope.status = task.Status;
    	$scope._id = task._id;
    	$scope.createddate = task.CreatedDate;
 	};
 	
 	$scope.cancel = function() {
    	$('#popup').removeClass('overlay');
    	$('#popup').addClass('hidden');
    	$scope.clearpopup();
 	};
 	
 	$scope.save = function() {
 		console.log($scope);
    	kinvey.edittask($scope).then(function() {
			alert("Task Saved");
    		$('#popup').removeClass('overlay');
    		$('#popup').addClass('hidden');
		});
		$scope.refreshList();
 	};
 	
 	$scope.addtask = function() {
 		
		kinvey.createtask($scope).then(function() {
			alert("Task Added");
			$scope.refreshList();
    		$('#popup').removeClass('overlay');
    		$('#popup').addClass('hidden');
		});
 	};
 	
 	$scope.clearpopup= function(){
    	$scope.status = $scope.content = "";
 	};
 	
 	$scope.refreshList=function(){
 		kinvey.task().then(function(data) {
			$scope.tasks = data.data;
		});
 	};
 	
 	//Pagination attempt ...it not working >:(
 	$scope.groupToPages = function () {
        $scope.pagedItems = [];
        
        for (var i = 0; i < $scope.tasks.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.tasks[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.tasks[i]);
            }
        }
    };
    
    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };
})


.controller('AddTaskCtrl', [
function() {

}]);