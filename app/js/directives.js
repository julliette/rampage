'use strict';

/* Directives */


angular.module('rampage.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

angular.module('rampage.directives').
directive('pager', ['$log', function($log) {
	return {
        restrict: "AE",
        replace : 'true',
        scope : {
        	currentIndex : '=pageIndex',
        	totalItems : '@pageItems',
        	increment : '@pageIncrement',
        	numPagesVisible : '@pagesVisible'
        },
        template: 	'<div class="pagination">' +
         				'<ul>' +
							'<li ng-class="{disabled:firstDisabled}"><a href ng-click="getPrevious()">&laquo;</a></li>' +
							'<li ng-class="{active:(currentPage == item.pageNumber)}" ng-repeat="item in items">' +
								'<a href ng-click="setIndex(item.index, item.pageNumber)">{{item.pageNumber}}</a></li>' +
							'<li ng-class="{disabled:lastDisabled}"><a href ng-click="getNext()">&raquo;</a></li>' +
						'</ul>' +
					'</div>',
        link: function (scope, element, attrs) {
        	scope.items = [];
        	scope.firstDisabled = true;
        	scope.lastDisabled = false;
        	scope.currentPage = scope.currentIndex % scope.increment + 1;

	       	attrs.$observe('pageItems', function(value) {
	    		if (value) {
	    			scope.items.length = 0;
		        	for (var i=0; i * scope.increment < value; i++) {
		        		$log.info('index: ' + i*scope.increment);
		        		scope.items.push({pageNumber: i + 1, index: i*scope.increment});
		        	}
		        	// select the first page
		        	scope.setIndex(0, 1);
	    		}
	  		});

	  		var toggleFirstLastButtons = function() {
        		// turn on/off the prev/next buttons
    			scope.firstDisabled = (scope.totalItems < scope.increment) || (scope.currentPage == 1);
    			scope.lastDisabled = (scope.items.length <= 1) || (scope.currentPage == scope.items.length);
	  		};

        	scope.setIndex = function(chosenIndex, chosenPage) {
        		// update the display of the search results by recalculating items
        		scope.currentPage = chosenPage;
        		scope.currentIndex = chosenIndex;
        		toggleFirstLastButtons();
        	};

        	scope.getPrevious = function() {
        		// update the display to the previous page
        		scope.currentPage = scope.currentPage - 1;
        		scope.currentIndex = parseInt(scope.currentIndex) - parseInt(scope.increment);
        		toggleFirstLastButtons();
        	};

        	scope.getNext = function() {
        		// update the display to the next page
        		scope.currentPage = scope.currentPage + 1;
        		scope.currentIndex = parseInt(scope.currentIndex) + parseInt(scope.increment);
        		toggleFirstLastButtons();
        	};
        }
    };
}]);