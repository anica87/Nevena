/**
 * Created by anicam on 12/01/2016.
 */
angular.module('angularCordovaApp')
  .directive("datepicker",function(){
      return{
        require: 'ngModel',
        link: function(scope, el, attr, ngModel){
          $(el).datepicker({
            onSelect: function(dateText){
              scope.$apply(function () {
                ngModel.$setViewValue(dateText);
              });
            }
          });
        }
      };
  });
