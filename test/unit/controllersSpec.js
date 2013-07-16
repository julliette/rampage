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
});
