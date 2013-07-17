'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
	var scope, control, $httpBackend;

	beforeEach(module('rampage', 'rampage.controllers', 'rampage.services','$strap.directives'));
	
	
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
	
	describe('get request controller', function(){
		var data = [{					 
				_id: "51e586db48ad8b6579021138",
				Status: "Incomplete",
				Content: "View Tasks"		
				 } ,  { 
				_id: "51e5873448ad8b6579021139",
				Status: "Complete",
				Content: "Add a task"			
				 } ,  { 
				_id: "51e5877648ad8b657902113b",
				Content: "Delete a task",
				Status: "Incomplete"				
				 } ,  { 
				_id: "51e5877648ad8b657902113c",
				Status: "Incomplete",
				Content: "Edit a task"				
				 } ,  { 
				_id: "51e5878e170a6c3c6e04be2a",
				Status: "Complete",
				Content: "Mark a task done"				
				 } ,  { 
				_id: "51e5880d48ad8b6579021140",
				Content: "Assign Tasks",
				Status: "Incomplete"				
				 }];  			
		it ('should return the list of tasks', inject(function($controller, SERVICE_URL, kinvey) {
			$httpBackend.expectGET(SERVICE_URL + '/Task').respond(data);
			
			control = $controller('viewTaskController', {
				$scope : scope,
				kinvey : kinvey
			});
			
			$httpBackend.flush();
			expect(scope.data).toEqual(data);
			
		}));	
		
		
		/*
				it ('should return the list of 5 tasks', inject(function($controller, SERVICE_URL, kinvey) {
			$httpBackend.expectGET(SERVICE_URL + '/Task').respond({
				data :  [{					 
				_id: "51e586db48ad8b6579021138",
				Status: "Incomplete",
				Content: "View Tasks"		
				 } ,  { 
				_id: "51e5873448ad8b6579021139",
				Status: "Complete",
				Content: "Add a task"			
				 } ,  { 
				_id: "51e5877648ad8b657902113b",
				Content: "Delete a task",
				Status: "Incomplete"				
				 } ,  { 
				_id: "51e5877648ad8b657902113c",
				Status: "Incomplete",
				Content: "Edit a task"				
				 } ,  { 
				_id: "51e5878e170a6c3c6e04be2a",
				Status: "Complete",
				Content: "Mark a task done"				
				 } ,  { 
				_id: "51e5880d48ad8b6579021140",
				Content: "Assign Tasks",
				Status: "Incomplete"				
				 }]  			
			});
			
			control = $controller('viewTaskController', {
				$scope : scope,
				kinvey : kinvey
			});
			
			$httpBackend.flush();
			expect(scope.data).count().toBe(5);
			
		}));		
		*/
	});
});


