/**
 * Created by anicam on 25/11/2015.
 */

'use strict';



angular.module('angularCordovaApp')
  .controller('authorsController', function ($scope, $http, $routeParams, $filter, $location, nameProductFilter) {
    // at the begining it was this instead of  $scope
    //paging
    $scope.totalRecords = 56;
    $scope.pageSize = 5;
    $scope.currentPage = 1;
    $scope.filteredCount = 45;
    var idParam = $routeParams.id;



    $scope.findAuthor = function(){
      $scope.filteredAuthors = $filter('nameProduct')($scope.searchText, $scope.authors);
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

    function init(){
      $http.get("http://localhost:3000/data")
        .success(function(data){
          $scope.authors = data.customers;
        })
        .error(function(data){
          console.log("Error "+ data);
        });
    };
    init();
   /* $scope.totalRecords = $scope.authors.length;*/
  });