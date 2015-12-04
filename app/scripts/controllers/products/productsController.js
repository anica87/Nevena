/**
 * Created by anicam on 04/12/2015.
 */

/**
 * Created by anicam on 25/11/2015.
 */

'use strict';



angular.module('angularCordovaApp')
  .controller('productsController', function ($scope, $http, $routeParams, $filter, $location) {
    // at the begining it was this instead of  $scope
    var idParam = $routeParams.id;



 /*   $scope.findAuthor = function(){
      $scope.authors = $filter('nameProduct')($scope.searchText, $scope.product);
    };*/

    $scope.navigate = function(url){
      $location.path(url);
    };

    function init(){
      $http.get("http://localhost:3000/products")
        .success(function(data){
          $scope.products = data.products;
        })
        .error(function(data){
          console.log("Error "+ data);
        });
    };
    init();
  });
