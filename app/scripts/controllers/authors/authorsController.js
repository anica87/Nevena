/**
 * Created by anicam on 25/11/2015.
 */

'use strict';



angular.module('angularCordovaApp')
  .controller('authorsController', function ($scope, $http, $routeParams, $filter, $location, nameProductFilter) {
    // at the begining it was this instead of  $scope
    //paging
    $scope.pageSize = 5;
    $scope.currentPage = 1;
    $scope.numPerPage = 100;
    var test = [];
    var idParam = $routeParams.id;
    $scope.authors = [];
    $scope.filteredAuthors = [];
    $scope.searchText = null;
    $scope.filteredCountAuthors = 0;

    var matches =[];

    $scope.predicate = 'ContactName';
    $scope.reverse = true;

    $scope.order = function(predicate){
      $scope.reverse = ($scope.predicate === predicate)? !$scope.reverse :false;
      $scope.predicate = predicate;

  }

    $scope.findAuthor = function(){
      $scope.filteredAuthors = $filter('nameProduct')($scope.searchText, $scope.authors);
    };

    $scope.searchTextChanged = function(){
      filterAuthors($scope.searchText);
    };

    $scope.navigate = function(url){
      $location.path(url);
    };

    $scope.DisplayModeEnum = {
      Card: 0,
      List: 1
    };

    $scope.OrderCount = function(customerID){

      for(var i = 0; i< matches.length; i++){
        if (matches[i].key === customerID){
          if(matches[i].value === 0){
            return "No orders";
          }
          return matches[i].value;
        }
      }


    };

    $scope.changeDisplayMode = function(displayMode){

        switch (displayMode){
          case $scope.DisplayModeEnum.Card:
                $scope.listDisplayModeEnabled = false;
                break;
          case $scope.DisplayModeEnum.List:
            $scope.listDisplayModeEnabled = true;
                break;
        }
    };

    $scope.pageChanged = function (page) {
      $scope.currentPage = page;
    };

    function filterAuthors(searchText){
      angular.forEach($scope.authors, function(author){
      $http.get("http://localhost:3000/customers/orders/"+ author.CustomerID)
        .success(function(data){
          matches.push({key:author.CustomerID, value: data.ordersCount})
        })
        .error(function(data){
          console.log("Error "+ data);
        });

      });
      console.log(matches);
      $scope.filteredAuthors = $filter('nameProduct')(searchText, $scope.authors);
      $scope.filteredCountAuthors = $scope.filteredAuthors.length;
    }
    $scope.paginate = function(value){
      var begin, end, index;
      begin = ($scope.currentPage - 1) * $scope.numPerPage;
      end = begin + $scope.numPerPage;
      index = $scope.filteredAuthors.indexOf(value);
      return (begin <= index && index < end);
    }

    $scope.deleteAuthor = function(){

      $http.delete("http://localhost:3000/customers/" + id)
        .success(function(){
          $scope.author = angular.copy($scope.originForm);
          $scope.registrForm.$setPristine();
          alert("Successfully deleted!")

        })
        .error(function(){
          alert("ERROR!")
        });
    };

    function init(){

      $http.get("http://localhost:3000/data")
        .success(function(data){
          $scope.authors = data.customers;
          test = data.customers;
          filterAuthors('');
        //  $scope.totalItems =  $scope.authors.length;
        })
        .error(function(data){
          console.log("Error "+ data);
        });


    };

    init();
  });
