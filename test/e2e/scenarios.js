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
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 1/);
    });

	it('should show the http status and data for the kinvey service', function() {
		
	});
  });


  describe('view2', function() {

    beforeEach(function() {
      browser().navigateTo('#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 2/);
    });

  });
  
	describe('viewTask', function(){
  		 beforeEach(function() {
    	 browser().navigateTo('#/viewTasks');
	    });
	
  		it('should render viewTask when user navigates to /viewTask', function(){
  			expect(element('[ng-view] p:first').text()).
        	toMatch(/New Task/);
  		});
  		
  		it('should return multiple tasks', function(){
  			expect(repeater('.tasks pre').count()).toBeGreaterThan(0);
  		});
  	});
});
