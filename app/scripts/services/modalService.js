/**
 * Created by anicam on 14/01/2016.
 */
angular.module('angularCordovaApp')
  .service('modalService',['$modal', function($modal){

    var modalOptions = {
      headerText: 'Proceed?',
      bodyText: 'Perform this action',
      closeButtonText: 'Close',
      actionButtonText:'OK'
    };

    var modalDefaults = {
      backdrop: true,
      keyboard: true,
      modalFade: true,
      templateUrl: "partials/modalDialog.html"
    };


    this.showModal = function(customModalDefaults, customModalOptions){
          if(!customModalDefaults) customModalDefaults = {}; // ne znam sta znaci ova linija koda
          customModalDefaults.backdrop = 'static';
          return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function(customModalDefaults, customModalOptions){

         // Create a temp object to work with service since we are in a singletion service
         var tempModalDefaults = {};
         var tempModalOptions = {};

        // Map angular-ui modal custom  defaults to modal defaults defined in service
          angular.extend(tempModalDefaults,modalDefaults, customModalDefaults);

        // Map modalDialog.html $scope customProperties to defaults defined in service
          angular.extend(tempModalOptions,modalOptions, customModalOptions);

        if(!tempModalDefaults.controller) {
            tempModalDefaults.controller = function($scope, $modalInstance){
              $scope.modalOptions = tempModalOptions;
              $scope.modalOptions.ok = function(result){
                $modalInstance.close(result);
              };
              $scope.modalOptions.close = function(result){
                $modalInstance.dismiss('cancel');
              };

            }

        }

        return $modal.open(tempModalDefaults).result;
    };

  }]);
