'use strict';

/* Directives */


angular.module('rampage.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('pager', function(){
  	  	return {
  	  		restrict : 'E',
  	  		templateUrl : 'partials/pager.html',
  	  		scope: {
        		pageNumber: '=',
        		pageCount: '='
      		}
      	// 	,
  	  		// link : function(scope, elm, attrs) {
     		// 	angular.element(elm).html("<h1>test</h1>");
     		// 	console.log(scope.pageNumber);
  	  		// }
  	  	};

  });
