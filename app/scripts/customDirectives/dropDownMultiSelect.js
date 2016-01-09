/**
 * Created by anicam on 05/01/2016.
 */


angular.module('angularCordovaApp')
  .directive("dropdownMultiselect",['$document', function($document){

  /*  return {
      restrict: 'E',
      require: '?ngModel',
      scope: {
        choices: '=',
        selected: '='
      },
      templateUrl: 'scripts/customDirectives/dropDownMultiSelect.html',
      replace: true,
      link: function (scope, element, attr) {
        scope.isVisible = false;
        scope.isChecked = function (item) {
          if (scope.selected.indexOf(item) !== -1) {
            return true;
          }
          return false;
        };
        scope.toggleChaeck = function (item) {
          if (!scope.isChecked(item)) {
            scope.selected.push(item);
          } else {
            scope.selected.splice(scope.selected.indexOf(item), 1);
          }
        };
        scope.toggleSelect = function () {
          scope.isVisible = !scope.isVisible;
        }

        element.bind('click', function (event) {
          event.stopPropagation();
        });

        $document.bind('click', function () {
          scope.isVisible = false;
          scope.$apply();
        });
      }

    }*/
    return {
     restrict: 'E',
     require: '?ngModel',
     scope: {
     model: '=',
     options: '=',
     pre_selected: '=preSelected'
     },

     templateUrl: "scripts/customDirectives/dropDownMultiSelect.html",
      link:function (scope, element, attr){
        scope.isVisible = false;

        element.bind('click', function (event) {
          event.stopPropagation();
        });

        $document.bind('click', function () {
          scope.isVisible = false;
          scope.$apply();
        });

        scope.toggleSelect = function () {
          scope.isVisible = !scope.isVisible;
        }

        scope.openDropDown = function () {
          scope.selected_items = [];
          for(var i = 0; i<= scope.pre_selected.length; i++){
            scope.selected_items.push(scope.pre_selected[i]);
          }
        };
        scope.selectAll = function(){
          scope.model = _.pluck(scope.options, 'id');
          console.log(scope.model);
        };

        scope.deselectAll = function(){
          $scope.model = [];
        };

        scope.setSelectedItem = function(){
          var id = this.option.id;
          if (_.contains(scope.model, id)) {
            scope.model = _.without(scope.model, id);
          } else {
            scope.model.push(id);
          }
          console.log(scope.model);
          return false;
        };

        scope.isChecked = function(id){
          if (_.contains(scope.model, id)) {
            return 'icon-ok pull-right';
          }
          return false;
        };

/*        scope.isChecked = function (item) {
          if (scope.selected.indexOf(item) !== -1) {
            return true;
          }
          return false;
        };*/
/*        scope.toggleChaeck = function (item) {
          if (!scope.isChecked(item)) {
            scope.selected.push(item);
          } else {
            scope.selected.splice(scope.selected.indexOf(item), 1);
          }
        };*/
    },
     controller: function ($scope){
/*     $scope.openDropDown = function () {
     $scope.selected_items = [];
     for(var i = 0; i<= $scope.pre_selected.length; i++){
     $scope.selected_items.push($scope.pre_selected[i]);
     }
     };

     $scope.selectAll = function(){
     $scope.model = _.pluck($scope.options, 'id');
     console.log($scope.model);
     };

     $scope.deselectAll = function(){
     $scope.model = [];
     };

     $scope.setSelectedItem = function(){
     var id = this.option.id;
     if (_.contains($scope.model, id)) {
     $scope.model = _.without($scope.model, id);
     } else {
     $scope.model.push(id);
     }
     console.log($scope.model);
     return false;
     };

     $scope.isChecked = function(id){
     if (_.contains($scope.model, id)) {
     return 'icon-ok pull-right';
     }
     return false;
     };*/

     }


    }

  }]);
