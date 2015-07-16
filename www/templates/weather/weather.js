angular
.module('weather.weather', [])

.controller('WeatherCtrl', function($scope, $stateParams, weather, $ionicLoading, $ionicActionSheet) {

  $ionicLoading.show();
  $scope.timeframe = 'currently';

  //gets scale and precision from local storage
  $scope.scale = weather.scale || 'F';
  $scope.precision = weather.precision || 2;

  //sets city, lat, lng from the page url
  $scope.city = $stateParams.city;
  var lat = $stateParams.lat*1
  var lng = $stateParams.lng*1

  //get or create saved cities list
  $scope.savedCities = weather.getFavorites();

  //disable save button if current city is on saved cities list
  $scope.savedCities.forEach(function(object){
    if(object.city === $scope.city){
      $scope.disableButton = true;
    }
  });

  //IIFE calls api for weather data
  ($scope.checkWeather = function(){
    weather.getWeather($scope.scale, lat, lng, function(res){
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
  })()

  //on pull to refresh
  $scope.doRefresh = function() {
    $scope.checkWeather();
    // Stop the ion-refresher from spinning
    $scope.$broadcast('scroll.refreshComplete');
  };

  //on save city button click
  $scope.saveCity = function(){
    $scope.disableButton = true;
    $scope.savedCities.push({
      city: $scope.city,
      lat: lat,
      lng: lng
    });
    weather.setFavorites($scope.savedCities);
  }

  // Triggered on a button click, or some other target
  $scope.show = function() {
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Hourly' },
        { text: 'Daily' },
        { text : 'Currently' }
      ],
      cancelText: 'Cancel',
      cancel: function() {
           return true;
         },
      buttonClicked: function(index) {
        switch(index){
         case 0: $scope.timeframe = 'hourly';
         break;
         case 1: $scope.timeframe = 'daily';
         break;
         case 2: $scope.timeframe = 'currently';
         break;
        }
        return true;
      }
    });

  };



});
