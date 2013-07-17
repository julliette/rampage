'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

	beforeEach(function() {
		browser().navigateTo('../../app/index.html');
	});

	it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
		expect(browser().location().url()).toBe("/view1");
	});

	describe('view1', function() {

		beforeEach(function() {
			browser().navigateTo('#/view1');
		});

		it('should render view1 when user navigates to /view1', function() {
			expect(element('[ng-view] p:first').text()).toMatch(/partial for view 1/);
		});

		it('should show the http status and data for the kinvey service', function() {

		});
	});

	describe('view2', function() {

		beforeEach(function() {
			browser().navigateTo('#/view2');
		});

		it('should render view2 when user navigates to /view2', function() {
			expect(element('[ng-view] p:first').text()).toMatch(/partial for view 2/);
		});

	});

	describe('taskList', function() {
		beforeEach(function() {
			browser().navigateTo('#/tasks');
		});

		it('should render the list of tasks', function() {
			// expect(repeater('.tasks li').count()).toBe(7);
			expect(element('.message:visible').count()).toBe(0);

			var promise = element('td:nth-child(2)', 'dates in the list').query(function(selectedElements, done) {
				var lastDate, inOrder = true;
				selectedElements.each(function(idx, elm) {
					if (elm.firstChild.data != "") {
						var currentItem = new Date(elm.firstChild.data);
						if (idx > 0) {
							inOrder = inOrder && (currentItem > lastDate);
						}
						lastDate = currentItem;
					}
				});
				done(null, inOrder);
			});

			expect(promise).toBeTruthy();

		});

		it('should render a message when the list is empty', function() {
			expect(element('.message:visible').count()).toBe(1);
		});
	});
});
