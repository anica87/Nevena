/**
 * Created by anicam on 03/12/2015.
 */
/**
 * Created by anicam on 25/11/2015.
 */
angular.module('angularCordovaApp')
  .controller('productEditController', function ( $scope, $http, $routeParams) {

    var id  = $routeParams.id;
    var productId = ($routeParams.productid) ? parseInt($routeParams.productid) : 0;
    var customerid = ($routeParams.customerid) ? parseInt($routeParams.customerid) : 0;
    $scope.buttonText = (productId > 0) ? 'Update' : 'Add';
    $scope.title = (productId > 0) ? 'Edit' : 'Add';
    $scope.product ={};
    $scope.author ={};



    $scope.getAllDetailsOfAuthor = function(author){
      return "bla bla " + author.ContactName;
    };


    $scope.saveProduct = function(){

      var id = parseInt($scope.product.CustomerID);
      if(!productId) {
        $http.post("http://localhost:3000/"+ id +"/addproduct",$scope.product)
          .success(function(){
            $scope.author = angular.copy($scope.originForm);
            $scope.product = angular.copy($scope.originForm);
            $scope.registrForm.$setPristine();
            /*  $scope.author = angular.copy($scope.originForm);
             $scope.registrForm.$setPristine();*/

          alert("Successfully saved!");

          })
          .error(function(){
            alert("ERROR!")
          });
      }
      else {
        $http.put("http://localhost:3000/"+ customerid + "/" + productId, $scope.product)
          .success(function(data){
            alert("Successfully updated!")
          })
          .error(function(data){
            alert(data);
          });

      }
    };

    $scope.deleteProduct = function(){

      $http.delete("http://localhost:3000/"+ customerid + "/" + productId)
        .success(function(){
          $scope.author = angular.copy($scope.originForm);
          $scope.product = angular.copy($scope.originForm);
          alert("Successfully deleted!")

        })
        .error(function(){
          alert("ERROR!")
        });
    };

    $scope.getProductById = function(){
      $http.get("http://localhost:3000/"+ customerid + "/" + productId)
        .success(function(data){
          alert("Izvrseno je"+ data.product);
          $scope.product = data.product;


        })
        .error(function(data){
          alert(" Nije Izvrseno");
        });
    };

    var init = function () {

      $http.get("http://localhost:3000/data")
        .success(function(data){
          $scope.authors = data.customers;
        })
        .error(function(data){
          console.log("Error "+ data);
        });


      $http.get("http://localhost:3000/" + customerid + "/" + productId)
        .success(function(data){
          $scope.product = data.product;


        })
        .error(function(data){
          alert(" Nije Izvrseno");
        });
    };


    init();

  });
