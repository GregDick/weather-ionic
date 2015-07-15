angular
.module('weather.search', [])

.controller('SearchCtrl', function($scope, $stateParams, weather) {

  $scope.locationChanged = _.debounce(function(){
    weather.getCoord($scope.location, function(data){
      $scope.cityArray = data.results;
      console.log($scope.cityArray);
    });
  }, 1200)

  if(localStorage.savedCities){
    $scope.savedCities = JSON.parse(localStorage.savedCities);
  }else{
    $scope.savedCities = [];
  }



});
