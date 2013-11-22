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
        		pageCount: '=',
            pagerName: '=',
            itemCount: '=',
            itemsPerPage: '='
      		}
          ,
  	  		link : function(scope, elm, attrs) {
            scope.min = Math.min;

            scope.genlink = function(page){
              var linkparam = { name : scope.pagerName, value : page};
              return scope.$parent.pagelink(linkparam);
            }
  	  		}
  	  	};

  }).directive('datepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat:'mm/dd/yy',
                    onSelect:function (date) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(date);
                        });
                    }
                });
            });
        }
    }
});;
