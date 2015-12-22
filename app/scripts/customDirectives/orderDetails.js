/**
 * Created by anicam on 09/12/2015.
 */

angular.module('angularCordovaApp')
.directive("orderDetails", function(){

  return{
    restrict:"E",
    template:'<a href="" ng-repeat="order in orders"><h4>{{order.Name}}</h4><h6>{{order.Description}}</h6> </a>',
    replace: false
  }

});
