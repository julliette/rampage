'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('rampage.services', ['ngResource']).
  value('version', '0.1');
  
angular.module('rampage.services').factory('kinvey', ['$resource', '$http', 'SERVICE_URL', function($resource, $http, SERVICE_URL) {
	
	var token = 'Basic a2lkX1RlMGlDYllzWWY6ZjA0Y2ZjMTVkYjA4NDE2ZThkNmRiMzA5NGQwMTYwYjA=';
	$http.defaults.headers.common['Authorization'] = token;
    $http.defaults.headers.post['Authorization'] = token;
	$http.defaults.headers.common['X-Kinvey-API-Version'] = '3';
	
	var taskURL = 'https://baas.kinvey.com/appdata/kid_Te0iCbYsYf/Task',
		taskEditURL = 'https://baas.kinvey.com/appdata/kid_Te0iCbYsYf/Task/:id';
	
	var service = {
		ping : function() {
			return $http({
				url: SERVICE_URL,
				method: 'GET'
			});
		},
		
		allTasks:function(){
			
			return $http({
				url: taskURL,
				method:'GET'
			});
			
		},
		
		addTask:function(newTask){
			return $http({
				url:taskURL,
				method:'POST',
				data:newTask
				
			});
		},
		editTask:function(task){
			return $http({
				url:taskEditURL.replace(':id',task._id),
				method:'PUT',
				data:task
			});
			
		},

		getTask:function(id){
			return $http({
				url: SERVICE_URL + "/" + id,
				method: 'GET'
			});
		}
		
	};
	
	return service;
}]);
