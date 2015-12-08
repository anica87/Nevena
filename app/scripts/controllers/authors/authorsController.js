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
    $scope.numPerPage = 10;

    var idParam = $routeParams.id;
    $scope.authors = [];
    $scope.filteredAuthors = [];
    $scope.searchText = null;
    $scope.filteredCountAuthors = 0;


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

    function init(){
      $http.get("http://localhost:3000/data")
        .success(function(data){
          $scope.authors = data.customers;
          filterAuthors('');
         // $scope.totalItems =  $scope.authors.length;
        })
        .error(function(data){
          console.log("Error "+ data);
        });
    };
    init();

   /* $scope.totalRecords = $scope.authors.length;*/
  });
