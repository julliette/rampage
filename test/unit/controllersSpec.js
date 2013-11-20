'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
	var scope, control, $httpBackend;

	beforeEach(module('rampage', 'rampage.controllers', 'rampage.services'));
	
	beforeEach(inject(function($rootScope, _$httpBackend_) {
		$httpBackend = _$httpBackend_;
		scope = $rootScope.$new();
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should call out to kinvey for a ping', inject(function($controller, SERVICE_URL, kinvey) {
		$httpBackend.expectGET(SERVICE_URL).respond({
			data : {
				version : "3.1.0",
				kinvey : "hello Rampage"
			}
		});
		control = $controller('MyCtrl1', {
			$scope : scope,
			kinvey : kinvey
		});

		$httpBackend.flush();
		expect(scope.status).toBe(200);
		expect(scope.data).toEqual({
			data : {
				version : "3.1.0",
				kinvey : "hello Rampage"
			}
		});
	}));

	it('should handle an error gracefully', inject(function($controller, SERVICE_URL, kinvey) {
		//TODO: wrong
		$httpBackend.expectGET(SERVICE_URL).respond({
			data : {
				version : "3.1.0",
				kinvey : "hello Rampage"
			}
		});
		control = $controller('MyCtrl1', {
			$scope : scope,
			kinvey : kinvey
		});

		$httpBackend.flush();
		expect(scope.status).toBe(200);
		expect(scope.data).toEqual({
			data : {
				version : "3.1.0",
				kinvey : "hello Rampage"
			}
		});
	}));



	it('should call out to kinvey for a list of tasks',inject(function($controller, kinvey){
		$httpBackend.expectGET('https://baas.kinvey.com/appdata/kid_Te0iCbYsYf/Task').respond(
			[
			  {
			    "_id": "51e586db48ad8b6579021138",
			    "Content": "View Tasks",
			    "Status": "Complete",
			    "CreatedDate": 1374600479621,
			    "_acl": {
			      "creator": "kid_Te0iCbYsYf"
			    },
			    "_kmd": {
			      "lmt": "2013-07-23T17:28:00.068Z",
			      "ect": "2013-07-16T17:46:03.323Z"
			    }
			  },
			  {
			    "_id": "51e5873448ad8b6579021139",
			    "Content": "Add some tasks",
			    "Status": "Incomplete",
			    "CreatedDate": 1374602027219,
			    "_acl": {
			      "creator": "kid_Te0iCbYsYf"
			    },
			    "_kmd": {
			      "lmt": "2013-07-23T17:53:48.196Z",
			      "ect": "2013-07-16T17:47:32.892Z"
			    }
			  }
			]
		);
		
		control = $controller('TaskListCtrl', {
			$scope:scope,
			kinvey:kinvey
		});

		$httpBackend.flush();
		
		expect(scope.tasks.length).toBe(2);
		
	}));
	
	it('should handle an error gracefully when calling for task list', 
			inject(function($controller, kinvey) {
					$httpBackend.expectGET('https://baas.kinvey.com/appdata/kid_Te0iCbYsYf/Task')
						.respond(404,'');
				
				control = $controller('TaskListCtrl', {
			$scope:scope,
			kinvey:kinvey
		});

		$httpBackend.flush();
		
		expect(scope.tasks.length).toBe(0);
		
			}));

});
