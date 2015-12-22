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

    //paging
    $scope.pageSize = 5;
    $scope.currentPage = 1;
    $scope.numPerPage = 10;

    $scope.navigate = function(url){
      $location.path(url);
    };

    $scope.searchText = null;

    $scope.predicate = 'OrderName';
    $scope.reverse = true;

    $scope.searchTextChanged = function(){

    };

    $scope.sort = function(predicate){
      $scope.reverse =($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };


    function init(){
      $http.get("http://localhost:3000/orders")
        .success(function(data){
          $scope.orders = data.orders;
          $scope.filteredCountOrders =  $scope.orders.length;
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
