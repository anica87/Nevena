/**
 * Created by anicam on 04/12/2015.
 */

'use strict';

angular.module('angularCordovaApp')
  .controller('ordersController', function ($scope, $http, $routeParams, $filter, $location) {
    // at the begining it was this instead of  $scope
    var idParam = $routeParams.id;

    $scope.orders = [];
    $scope.filteredOrders=[];
    $scope.ordersTotal = 0.00; // BITNO , for loop be careful, why without i++, is it replaceing with +=

    //paging
    $scope.pageSize = 5;
    $scope.currentPage = 1;
    $scope.numPerPage = 10;

    $scope.startDate =  moment();
    $scope.endDate = moment();
    //$scope.day = moment();

    $scope.toggleDetail = function($index){
      $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
    }

    $scope.roles = [
      {"id": 1, "name": "Manager", "assignable": true},
      {"id": 2, "name": "Developer", "assignable": true},
      {"id": 3, "name": "Reporter", "assignable": true}
    ];

    $scope.member = {authors: []};
    $scope.selected_items = [];

    var calculateOrdersTotal = function(){
      $scope.ordersTotal = 0.00
      for(var i =0; i < $scope.orders.length; i++)
      {
        var order =  $scope.orders[i];
        $scope.ordersTotal += order.UnitPrice * order.Quantity;
      }
    };

   // $scope.selectedOptions = [];

    $scope.searchButton = function(){
      var matches = [];
      angular.forEach($scope.orders, function(order) {
        angular.forEach($scope.selected_items, function(authorID) {
          if(authorID ==  order.CustomerID){
            var dateOfSale = new Date(order.DateOfSale);
            var start = new Date($scope.startDate);
            var end = new Date($scope.endDate);
            if (dateOfSale >= start && dateOfSale <= end ) {
              matches.push(order);
            }
            else{
              console.log("nothing found");
            }
          }

        });
      });
      $scope.orders =matches;
      calculateOrdersTotal();
    };

    $scope.formatStartDate = function(){
     return new Date($scope.startDate).toLocaleDateString("en-US");
     // return new Date($scope.startDate);

    };

    $scope.formatEndDate = function(){
     return new Date($scope.endDate).toLocaleDateString("en-US");
      //return new Date($scope.endDate);
    };

    $scope.navigate = function(url){
      $location.path(url);
    };

    $scope.searchText = null;

    $scope.predicate = 'OrderName';
    $scope.reverse = true;

    $scope.searchTextChanged = function(){
        filterOrdersByAuthorOrProductName($scope.searchText);
    };
    function filterOrdersByAuthorOrProductName(searchText){
      if(!searchText){

      }
      else{
        $scope.orders =  $filter('orders')(searchText, $scope.orders);
        calculateOrdersTotal();
      }
    }




    $scope.sort = function(predicate){
      $scope.reverse =($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    $scope.totals = function(){
      var x =  ($scope.ordersTotal*70)/100;
      var y =  ($scope.ordersTotal*30)/100;
      return "Autor: " +  x + "  " +  "Worker: " + y;
    };


    function init(){
      $http.get("http://localhost:3000/orders")
        .success(function(data){
          $scope.orders = data.orders;
          filterOrdersByAuthorOrProductName('');
          $scope.filteredCountOrders =  $scope.orders.length;
          for(var i =0; i< $scope.orders.length; i++)
          {
            var order =  $scope.orders[i];
            $scope.ordersTotal += order.UnitPrice * order.Quantity;
          }

        })
        .error(function(data){
          console.log("Error "+ data);
        });

      $http.get("http://localhost:3000/products")
        .success(function(data){
          $scope.products = data.products;
        })
        .error(function(data){
          console.log("Error "+ data);
        });

      $http.get("http://localhost:3000/data")
        .success(function(data){
          $scope.authors = data.customers;
        })
        .error(function(data){
          console.log("Error "+ data);
        });
    };
    init();
  });
