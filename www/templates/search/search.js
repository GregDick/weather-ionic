angular
.module('weather.search', [])

.controller('SearchCtrl', function($scope, $stateParams, weather) {

  //check for new saved cities on every page entrance
  $scope.$on('$ionicView.enter', function() {
    $scope.savedCities = weather.getFavorites();
    //clear search on page load
    $scope.location = '';
    if($scope.cityArray){
      $scope.cityArray.length = 0;
    }
    //disable current location button if current location already saved
    $scope.savedCities.forEach(function(object){
      if(object.city === $scope.city){
        $scope.disableButton = true;
      }
    });
  });

  //get current location
  weather.getCurrentLocation(function(data){
    $scope.city = `${data.city}, ${data.region}, ${data.countryCode}`;
    $scope.lat = data.lat;
    $scope.lng = data.lon;
  })

  //add current location as favorite
  $scope.addCurLoc = function(){
    $scope.savedCities.push({
      city: $scope.city,
      lat: $scope.lat,
      lng: $scope.lng
    });
    weather.setFavorites($scope.savedCities);
    $scope.disableButton = true;
  }


  //search for city 1200ms after typing stops
  $scope.locationChanged = _.debounce(function(){
    weather.getCoord($scope.location, function(data){
      $scope.cityArray = data.results;
      console.log($scope.cityArray);
    });
  }, 1200)
  //delete a saved city
  $scope.remove = function(i){
    $scope.savedCities.splice(i, 1);
    weather.setFavorites($scope.savedCities);
  }

});
