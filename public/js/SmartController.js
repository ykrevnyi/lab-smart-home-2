'use strict';

angular.module('app', ['dndLists', 'ngDialog']).config(function($interpolateProvider){
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

angular.module("app").controller("SmartController", function($scope, ngDialog) {

  $scope.room = {
    label: 'Room',
    allowedTypes: ['device', 'sensor'],
    items: []
  }

  $scope.devices = {
      label: "Devices",
      allowedTypes: ['device'],
      items: [
          {title: "LED lamp 1", type: "device"},
          {title: "LED lamp 2", type: "device"},
          {title: "LED lamp 3", type: "device"}
      ]
  };

  $scope.sensors = {
      label: "Sensors",
      allowedTypes: ['sensor'],
      items: [
          {title: "Motion sensor", type: "sensor"},
          {title: "Door sensor", type: "sensor"},
          {title: "Light sensor", type: "sensor"}
      ]
  };

  $scope.addDevice = function(e) {
    var popup = ngDialog.open({
      template: '/views/popups/addDevice.html',
      className: 'ngdialog-theme-default',
      controller: 'AddDeviceController'
    });

    popup.closePromise.then(function(data) {
      var device = data.value;

      $scope.devices.items.push(device);
    });

    e.preventDefault();
  };

  $scope.addSensor = function(e) {
    var popup = ngDialog.open({
      template: '/views/popups/addSensor.html',
      className: 'ngdialog-theme-default',
      controller: 'AddSensorController'
    });

    popup.closePromise.then(function(data) {
      var device = data.value;

      $scope.sensors.items.push(device);
    });

    e.preventDefault();
  };

});