angular.module('angularCordovaApp')
  .directive("calendar", function(){
    return {
      restrict: 'A',
      controller: 'datepickerCtrl',
      controllerAs: 'dp',
      templateUrl: 'calendar.html',
      scope: {
        'value': '='
      },
      link: function (scope) {

      }

  };





});
