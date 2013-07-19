'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('rampage.services', ['ngResource']).
  value('version', '0.1');
  
angular.module('rampage.services').factory('kinvey', ['$resource', '$http', 'SERVICE_URL', function($resource, $http, SERVICE_URL, $log) {
	
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
		getData : function(){
			return $http({
				url: SERVICE_URL + '/Task',
				method: 'GET'
			});
		},
		addData : function(data){			
			//var resource=$resource(SERVICE_URL + '/Task');	
			//resource.save(data);			
			 return $http({
				url: SERVICE_URL + '/Task',
				method: 'POST',				
				data:data
				});
			//}).error(function(data,status){
				//$log.warn(data,status);
			//});			
		},
		updateData : function(data){
			return $http({
				url: SERVICE_URL + '/Task/' + data._id,
				method: 'PUT',
				data: data
			});
		}
	};
	
	return service;
}]);
