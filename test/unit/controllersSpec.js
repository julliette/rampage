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
				Content : "View Tasks"
			}, {
				_id : "51e5873448ad8b6579021139",
				Status : "Complete",
				Content : "Add a task"
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
	});
});
