'use strict';

/**
 * @ngdoc function
 * @name angularCordovaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularCordovaApp
 */
angular.module('angularCordovaApp')
  .controller('MainCtrl', function ($scope, cordova) {
   /*  this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];*/
	cordova.ready.then(function () {
        alert('Cordova is ready');
  });
  });
