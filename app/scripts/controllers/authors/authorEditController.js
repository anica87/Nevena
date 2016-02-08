/**
 * Created by anicam on 25/11/2015.
 */
angular.module('angularCordovaApp')
  .controller('authorEditController',['$scope', '$http', '$routeParams', 'modalService', function ( $scope, $http, $routeParams, modalService) {

    var id  = $routeParams.id;
    var authorId = ($routeParams.id) ? parseInt($routeParams.id) : 0;
    $scope.buttonText = (authorId > 0) ? 'Update' : 'Add';
    $scope.title = (authorId > 0) ? 'Edit' : 'Add';
    $scope.buttonDisplay = (authorId > 0) ? false : true;
    $scope.author ={};




    $scope.saveAuthor = function(){


       if(!authorId) {
        $http.post("http://localhost:3000/addcustomer",$scope.author)
          .success(function(){
            $scope.author = angular.copy($scope.originForm);
            $scope.editForm.$setPristine();
            alert("Successfully saved!");

          })
          .error(function(){
            alert("ERROR!")
          });
     }
      else {
       $http.put("http://localhost:3000/customers/" + id, $scope.author)
         .success(function(data){
           alert("Successfully updated!")
         })
         .error(function(data){
           alert(data);
         });

     }

    };

    $scope.deleteAuthor = function(){

      var modalOptions = {
        headerText: 'Delete',
        bodyText: 'Are you sure you want to delete this customer?',
        closeButtonText: 'Cancel',
        actionButtonText:'Delete Customer'
      };

       modalService.showModal({}, modalOptions).then(
         function(result){
          console.log("Ovde treba da pozovem dataService");
         });
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

    $scope.getAuthorById = function(){
      $http.get("http://localhost:3000/customers/" + id)
        .success(function(data){
          alert("Izvrseno je"+ data.author);
          $scope.author = data.author;


        })
        .error(function(data){
          alert(" Nije Izvrseno");
        });
    };

    var init = function () {
      $http.get("http://localhost:3000/customers/" + id)
        .success(function(data){
          $scope.author = data.author;


        })
        .error(function(data){
          alert(" Nije Izvrseno");
        });
    };
    init();

  }]);
