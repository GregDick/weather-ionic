angular
.module('weather.settings', [])
.controller('SettingsCtrl', function($scope, weather){
  $scope.scale = weather.scale || 'farenheit';
  $scope.precision = weather.precision || 2;

  $scope.$watch('precision', function(){
    weather.precision = $scope.precision;
  })

  $scope.$watch('scale', function(){
    weather.scale = $scope.scale;
  })


})
