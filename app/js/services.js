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
	
	var service = {
		ping : function() {
			return $http({
				url: SERVICE_URL,
				method: 'GET'
			});
		},
		
		//used on home page to get task
		listTasks:function(){
			return $http({
				method: 'GET',
				url: SERVICE_URL + '/Task'				
			});
		},
		
		//creates a new task
		saveTask: function(content){
			return $http({
				url: SERVICE_URL + '/Task',
				method: 'POST',
				data: {
					"Content": content.Content,
					"Status": content.Status,
					"CreatedDate":new Date().getTime(),
					"DueDate" : content.DueDate,
					"User" : content.User
				}
			});
		},
		
		//
		editTask: function(taskData){
		
			return $http({
				url: SERVICE_URL + '/Task/'+ taskData._id,
				method: 'PUT',
				data: {
					"Content": taskData.Content,
					"Status": taskData.Status,
					"CreatedDate":taskData.CreatedDate,
					"DueDate" : taskData.DueDate,
					"User" : taskData.User
				}
			});
		},
		deleteTask: function(taskId){
			return $http({
				url: SERVICE_URL+'/Task/'+taskId,
				method: 'DELETE'
			});
		},
		viewTask : function(taskId){

			return $http({
				url: SERVICE_URL+'/Task/'+ taskId,
				method: 'GET'
			});
		},


		//For users
		getUsers: function(){
			return $http({
				url: SERVICE_URL+'/TeamMember',
				method: 'GET'
			});
		}
	};
	
	
	
	return service;
}]);
