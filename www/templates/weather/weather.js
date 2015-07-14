angular
.module('weather.weather', [])

.controller('WeatherCtrl', function($scope, $stateParams, Weather, $ionicLoading) {

  $ionicLoading.show();

  $scope.city = $stateParams.city;
  var lat = $stateParams.lat*1
  var lng = $stateParams.lng*1

  Weather.getWeather(lat.toFixed(4), lng.toFixed(4), function(res){
    $ionicLoading.hide();
    $scope.forecast = res;
    console.log(res)
  })
});
