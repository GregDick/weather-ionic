angular
.module('weather.weather', [])

.controller('WeatherCtrl', function($scope, $stateParams, weather, $ionicLoading) {

  $ionicLoading.show();

  //gets scale and precision from local storage
  $scope.scale = weather.scale || 'F';
  $scope.precision = weather.precision || 2;

  //sets city, lat, lng from the page url
  $scope.city = $stateParams.city;
  var lat = $stateParams.lat*1
  var lng = $stateParams.lng*1

  if($scope.scale === 'C'){
    lng += '/?units=uk2';
  }

  //calls api for weather data
  weather.getWeather(lat, lng, function(res){
    $ionicLoading.hide();
    $scope.forecast = res;
    console.log(res);

    //alter icon string to fit my icon font
    $scope.iconText = res.currently.icon;
    if($scope.iconText.indexOf('night') > -1){
      var i = $scope.iconText.indexOf('night');
      var prefix = $scope.iconText.slice(i);
      var remaining = $scope.iconText.substring(0,i-1);
      $scope.iconText = prefix + '-' +  remaining;
    }
    else if($scope.iconText === 'partly-cloudy-day'){
      $scope.iconText = 'day-cloudy';
    }
    else if($scope.iconText === 'clear-day'){
      $scope.iconText = 'day-sunny';
    }
    else if($scope.iconText.indexOf('day') > -1){
      var i = $scope.iconText.indexOf('day');
      var prefix = $scope.iconText.slice(i);
      var remaining = $scope.iconText.substring(0,i-1);
      $scope.iconText = prefix + '-' + remaining;
    }
  })

  if(localStorage.savedCities){
    $scope.savedCities = JSON.parse(localStorage.savedCities);
  }else{
    $scope.savedCities = [];
  }

  $scope.saveCity = function(){
    console.log(typeof $scope.savedCities);
    $scope.savedCities.push($scope.city);
    localStorage.savedCities = JSON.stringify($scope.savedCities);
  }





});
