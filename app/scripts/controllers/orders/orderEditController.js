/**
 * Created by anicam on 04/12/2015.
 */

angular.module('angularCordovaApp')
  .controller('orderEditController', function ( $scope, $http, $routeParams) {

    var id  = $routeParams.id;
    var productId = ($routeParams.productid) ? parseInt($routeParams.productid) : 0;
    var customerid = ($routeParams.customerid) ? parseInt($routeParams.customerid) : 0;
    var orderid = ($routeParams.orderid) ? parseInt($routeParams.orderid) : 0;
    $scope.buttonText = (orderid > 0) ? 'Update' : 'Add';
    $scope.title = (orderid > 0) ? 'Edit' : 'Add';
    $scope.product ={};
    $scope.author ={};
    $scope.order ={};
    $scope.order.DateOfSale = moment();
    $scope.defaultValueAuthor = "bla bla testing";
    $scope.defaultValueProduct = "bla bla  productName";

    $scope.getAllDetailsOfAuthor = function(author){
      return "bla bla " + author.ContactName;
    };

    $scope.getAllProducts = function(product){
      return "product " + product.ProductName;
    };


    $scope.saveOrder = function(){
      var customerid = parseInt($scope.author.CustomerID);
      if(!productId) {
        $http.post("http://localhost:3000/"+customerid+ "/"+ productId +"/addorder",$scope.order)
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
        $http.put("http://localhost:3000/"+ customerid + "/" + productId +"/" + orderid , $scope.order)
          .success(function(data){
            alert("Successfully updated!")
          })
          .error(function(data){
            alert(data);
          });

      }

    };

    $scope.deleteOrder = function(){

      $http.delete("http://localhost:3000/"+ customerid + "/" + productId +"/"+ orderid)
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
      $http.get("http://localhost:3000/"+ customerid + "/" + productId + "/" + orderid)
        .success(function(data){
          alert("Izvrseno je"+ data.order);
          $scope.order = data.order;


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

      $http.get("http://localhost:3000/products")
        .success(function(data){
          $scope.products = data.products;
        })
        .error(function(data){
          console.log("Error "+ data);
        });


      $http.get("http://localhost:3000/"+ customerid + "/" + productId + "/" + orderid)
        .success(function(data){
          $scope.order = data.order;


        })
        .error(function(data){
          alert(" Nije Izvrseno");
        });


    };


    init();

  });
