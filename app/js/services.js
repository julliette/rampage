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
		getTasks : function(params){
			return $http({
				url: SERVICE_URL + "/Task?query={}&sort={'CreatedDate': -1}",
				method: 'GET',
			})
		},
		addTask : function(data){
			return $http({
				url: SERVICE_URL + "/Task",
				method: 'POST',
				data: data
			})
		},
		updateTask : function(data){
			return $http({
				url : SERVICE_URL + "/Task/" + data["_id"],
				method : 'PUT',
				data : data
			});
		},
		countTask : function(){
			return $http({
				url : SERVICE_URL + '/Task/_count',
				method : 'GET'
			})
		},
		getTasksPage : function(limit, skip){
			return $http({
				url: SERVICE_URL + "/Task?sort={'CreatedDate': -1}&limit=" + limit + "&skip=" + skip,
				method: 'GET',
			})
		}

	};
	
	return service;
}]);
