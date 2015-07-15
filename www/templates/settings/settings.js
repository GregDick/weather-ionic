angular
.module('weather.settings', [])
.controller('SettingsCtrl', function($scope, Weather){
  $scope.scale = Weather.scale;
  $scope.precision = Weather.precision;

  console.log($scope.precision)
})
