angular
.module('weather.search', [])

.controller('SearchCtrl', function($scope, $stateParams, Weather) {

  $scope.locationChanged = _.debounce(function(){
    Weather.getCoord($scope.location, function(data){
      $scope.cityArray = data.results;
      console.log($scope.cityArray);
    });
  }, 1200)



});
