'use strict';

/**
 * @ngdoc overview
 * @name angularCordovaApp
 * @description
 * # angularCordovaApp
 *
 * Main module of the application.
 */

/*var db = null;
var fs = require('fs');*/



 angular
  .module('angularCordovaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/authors/authors.html', //'views/main.html',
        controller:  'authorsController',//'MainCtrl',
        controllerAs: 'authors' //'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
     .when ('/authorEdit/:id',{
        templateUrl: 'views/authors/authorEdit.html',
        controller:  'authorEditController',
        controllerAs: 'authorEdit'
      })

      .when ('/authors',{
        templateUrl: 'views/authors/authors.html',
        controller:  'authorsController',
        controllerAs: 'authors'
      })
      .when ('/products',{
        templateUrl: 'views/products/products.html',
        controller:  'productsController',
        controllerAs: 'products'
      })
      .when ('/productEdit/:customerid/:productid',{
        templateUrl: 'views/products/productEdit.html',
        controller:  'productEditController',
        controllerAs: 'productEdit'
      })

      .when ('/products',{
        templateUrl: 'views/products/products.html',
        controller:  'productsController',
        controllerAs: 'products'
      })
      .when ('/productEdit/:customerid/:productid',{
        templateUrl: 'views/products/productEdit.html',
        controller:  'productEditController',
        controllerAs: 'productEdit'
      })

      .when ('/orders',{
        templateUrl: 'views/orders/orders.html',
        controller:  'ordersController',
        controllerAs: 'products'
      })
      .when ('/orderEdit/:customerid/:productid/:orderid',{
        templateUrl: 'views/orders/orderEdit.html',
        controller:  'orderEditController',
        controllerAs: 'productEdit'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


