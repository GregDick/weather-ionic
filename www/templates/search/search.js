angular
.module('weather.search', [])

.controller('SearchCtrl', function($scope, $stateParams, weather) {

  //check for new saved cities on every page entrance
  $scope.$on('$ionicView.enter', function() {
    $scope.savedCities = weather.getFavorites();
  });
  //search for city 1200ms after typing stops
  $scope.locationChanged = _.debounce(function(){
    weather.getCoord($scope.location, function(data){
      $scope.cityArray = data.results;
      console.log($scope.cityArray);
    });
  }, 1200)
  //delete a saved city
  $scope.delete = function(i){
    $scope.savedCities.splice(i, 1);
    weather.setFavorites($scope.savedCities);
  }

});
