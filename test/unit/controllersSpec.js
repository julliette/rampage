'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
	var scope, control, $httpBackend;


	beforeEach(function() {
		this.addMatchers({
			toEqualData : function(expected) {
				return angular.equals(this.actual, expected);
			}
		});
	});

	beforeEach(module('rampage', 'rampage.controllers', 'rampage.services'));

	beforeEach(inject(function($rootScope, _$httpBackend_) {
		$httpBackend = _$httpBackend_;
		scope = $rootScope.$new();
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('MyCtrl1 tests', function() {
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

	});

	describe('Tasks controller tests', function() {

		var data = [{
				_id : "51e586db48ad8b6579021138",
				Status : "Incomplete",
				Content : "View Tasks",
				CreatedDate : 1055184000000
			}, {
				_id : "51e5873448ad8b6579021139",
				Status : "Complete",
				Content : "Add a task",
				CreatedDate : 1055154000000
			}];

		it('should call out to kinvey for tasks', inject(function($controller, SERVICE_URL, kinvey) {
			$httpBackend.expectGET(SERVICE_URL + '/Task').respond(data);
			control = $controller('TaskController', {
				$scope : scope,
				kinvey : kinvey
			});

			expect(scope.tasks).toEqual([]);
			$httpBackend.flush();
			expect(scope.tasks).toEqualData(data);
		}));
		
		it('should handle 0 items returned ok', inject(function($controller, SERVICE_URL, kinvey) {
			$httpBackend.expectGET(SERVICE_URL + '/Task').respond([]);
			control = $controller('TaskController', {
				$scope : scope,
				kinvey : kinvey
			});

			expect(scope.tasks).toEqual([]);
			$httpBackend.flush();
			expect(scope.tasks).toEqualData([]);
		}));
		
		it('should handle retrieve error properly', inject(function($controller, SERVICE_URL, kinvey) {
			$httpBackend.expectGET(SERVICE_URL + '/Task').respond(500, {});
			control = $controller('TaskController', {
				$scope : scope,
				kinvey : kinvey
			});

			expect(scope.tasks).toEqual([]);
			expect(scope.message).toEqual("");
			$httpBackend.flush();
			expect(scope.tasks).toEqual([]);
			expect(scope.message).toEqual("There was an error retrieving your tasks.");
		}));
		
		describe('task action tests', function() {
			var returnedTask = {
				_id : "stuff",
				Content : "Test this thing!",
				Status : "Incomplete",
				CreatedDate : 1055184000000
			};
			
			var kinveyError = {
				"error" : "The request was not understood.",
				"request" : "POST /appdata/kid_Te0iCbYsYf/Task/51e5878e170a6c3c6e04be2a"
			}; 
			
			beforeEach(inject(function($controller, SERVICE_URL, kinvey) {
				$httpBackend.expectGET(SERVICE_URL + '/Task').respond(data);
				control = $controller('TaskController', {
					$scope : scope,
					kinvey : kinvey
				});
				$httpBackend.flush();
			}));
			
			it('should save a new task', inject(function(SERVICE_URL) {
				// setup with user-entered data, server response
				var task = {Content: "asdf", Status: "asdfas"};
				$httpBackend.expectPOST(SERVICE_URL + '/Task').respond(returnedTask);
				
				// make sure initial state is as expected
				expect(scope.tasks.length).toEqual(2);
				
				// save
				scope.saveTask({}, task);
				$httpBackend.flush();

				// new task should be added to the list
				expect(scope.tasks.length).toEqual(3);	
				
				// make sure it cleans up after
				expect(scope.editing).toEqual({});
				expect(scope.original).toEqual({});			
			}));
			
			it('should show a message if a save new fails', inject(function(SERVICE_URL) {
				// setup with user-entered data, server response
				var task = {Content: "asdf", Status: "asdfas"};
				$httpBackend.expectPOST(SERVICE_URL + '/Task').respond(500, kinveyError);
				
				// make sure initial state is as expected
				expect(scope.tasks.length).toEqual(2);
				
				// save
				scope.saveTask({}, task);
				$httpBackend.flush();

				// new task should not be added to the list
				expect(scope.tasks.length).toEqual(2);
				expect(scope.message).toEqual("Failed to create new task. Please try again: 500");				
			}));
			
			it('should update an existing task', inject(function(SERVICE_URL) {
				// setup with user-entered data, server response
				var task = angular.copy(data[0]);
				task.Status = "Complete";
				$httpBackend.expectPUT(SERVICE_URL + '/Task/' + task._id).respond(task);
				
				// make sure initial state is as expected
				expect(scope.tasks.length).toEqual(2);
				
				// save
				scope.saveTask(scope.tasks[0], scope.tasks[0]);
				$httpBackend.flush();

				// updated task should replace the old one
				expect(scope.tasks.length).toEqual(2);	
				expect(scope.tasks[0].Status).toEqual("Complete");
				// make sure it cleans up after
				expect(scope.editing).toEqual({});
				expect(scope.original).toEqual({});			
				
			}));
			
			it('should show a message if an update old fails', inject(function(SERVICE_URL) {
				// setup with user-entered data, server response
				var task = data[0];
				$httpBackend.expectPUT(SERVICE_URL + '/Task/' + task._id).respond(500, kinveyError);
				
				// make sure initial state is as expected
				expect(scope.tasks.length).toEqual(2);
				
				// save
				scope.saveTask(scope.tasks[0], scope.tasks[0]);
				$httpBackend.flush();

				// new task should not be added to the list
				expect(scope.tasks.length).toEqual(2);
				expect(scope.message).toEqual("Failed to save updated task. Please try again: 500");				
			}));
			
			it('should cancel out of the edit without making any updates', inject(function() {
				scope.editing = {blah: "blah"};
				scope.original = {bob: "suzie"};
				
				scope.cancelEdit();
				// make sure it cleans up after
				expect(scope.editing).toEqual({});
				expect(scope.original).toEqual({});			

			}));
			
		});
	});
});
