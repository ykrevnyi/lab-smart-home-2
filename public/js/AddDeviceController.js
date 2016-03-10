'use strict';

angular.module('app').controller('AddDeviceController', function($scope) {

  $scope.device = {
    type: 'device',
    title: '',
    pin: ''
  };

  $scope.create = function(e) {
    $scope.closeThisDialog($scope.device);

    e.preventDefault();
  }

});
