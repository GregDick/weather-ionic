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
    console.log(res);
    $scope.iconText = res.currently.icon;
    if($scope.iconText.indexOf('night') > -1){
      var i = $scope.iconText.indexOf('night');
      var prefix = $scope.iconText.slice(i);
      var remaining = $scope.iconText.substring(0,i-1);
      $scope.iconText = prefix + '-' +  remaining;
      console.log($scope.iconText);
    }else if($scope.iconText.indexOf('day') > -1){
      var i = $scope.iconText.indexOf('day');
      var prefix = $scope.iconText.slice(i);
      var remaining = $scope.iconText.substring(0,i-1);
      $scope.iconText = prefix + '-' + remaining;
      console.log($scope.iconText);
    }
  })
});
