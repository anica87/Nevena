/**
 * Created by anicam on 24/12/2015.
 */

angular.module('angularCordovaApp')
  .filter('orders', function(){
      return function (filterValue, orders){

        if(!filterValue){
          return orders;
        }

        var matches = [];
        filterValue = filterValue.toString().toLowerCase();

        angular.forEach(orders, function(order){
          if(order.OrderName.indexOf(filterValue) !== -1||order.ProductName.indexOf(filterValue) !== -1 || order.ContactName.indexOf(filterValue) !== -1){
            matches.push(order);
          }

        });
        return matches;
      }

});
