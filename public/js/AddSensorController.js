'use strict';

angular.module('app').controller('AddSensorController', function($scope) {

  $scope.sensor = {
    type: 'sensor',
    title: '',
    pin: ''
  };

  $scope.create = function(e) {
    $scope.closeThisDialog($scope.sensor);

    e.preventDefault();
  }

});
