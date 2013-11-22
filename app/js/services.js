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
		
		tasks : function() {
			return $resource(SERVICE_URL + '/Task/:action/:id', {id:'@_id', action:'@action', sort:'{"CreatedDate":-1}'}, {
				update : {method: 'PUT'},
				countAll : {method: 'GET', params: {action: '_count'}},
				boundedQuery : {method: 'GET', params: {limit: '@limit', skip: '@skip'}, isArray: true}
			});
		},

		members : function() {
			return $resource(SERVICE_URL + '/TeamMember/:id', {id:'@_id'});
		}
	};
	
	return service;
}]);
