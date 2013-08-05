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
	
	it('should work as expected, ', inject(function($controller, SERVICE_URL, kinvey) {
		var nullvar = null; 
		expect(scope.status).toEqual(null);
		expect(scope.status).toEqual(nullvar);
	}));

	it('should retreive tasks from the kinvey task table', inject(function($controller, SERVICE_URL, kinvey) {
		var data = [{
			_id: "51e6a22c1223775306019752",
			Status: "This is a test task",
			Content: "Complete",
			CreatedDate: "1374600437822"
		} , {
			_id: "51e6e581122377530601d8a2",
			Status: "Complete",
			Content: "Be nice to each other",
			CreatedDate: "1555185000000"						
		} , {
			_id: "51e8094a122377530602774b",
			Status: "Incomplete",
			Content: "Become Batman",
			CreatedDate: "1374161229765"
		}];
 
		var TASK_URL = SERVICE_URL + "/Task";
		$httpBackend.expectGET(TASK_URL).respond(data);		

		control = $controller('TaskController', {
			$scope : scope,
			kinvey : kinvey
		})

		$httpBackend.flush();
		expect(scope.tasks).toEqual(data);
		
	}));


	//Display tasks details in the order that they were entered.
	//Content and status of the task should be displayed.
	//"No tasks" should be displayed if there are no tasks.

//	it('', inject(function($controller, SERVICE_URL, kinvey) {
//	}));

	

});
