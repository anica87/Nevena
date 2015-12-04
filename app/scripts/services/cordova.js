'use strict';

/**
 * @ngdoc service
 * @name angularCordovaApp.cordova
 * @description
 * # cordova
 * Factory in the angularCordovaApp.
 */
angular.module('angularCordovaApp')
  .factory('cordova', function () {
	var d = $q.defer(),  
	resolved = false;

	var self = this;  
	this.ready = d.promise;

			document.addEventListener('deviceready', function () {
		resolved = true;
		d.resolve($window.cordova);
	});

	// Check to make sure we didn't miss the
	// event (just in case)
	setTimeout(function () {  
		if (!resolved) {
			if ($window.cordova) d.resolve($window.cordova);
		}
	}, 3000);

	// Public API here
	return this

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  }); 
