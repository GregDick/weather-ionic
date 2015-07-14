angular
.module('weather.search', [])

.controller('SearchCtrl', function($scope, $stateParams, Weather) {

  $scope.locationChanged = _.debounce(function(){
    Weather.getCoord($scope.location, function(data){
      $scope.lat = data.results[0].geometry.location.lat;
      $scope.lng = data.results[0].geometry.location.lng;
      console.log($scope.lat);
      console.log($scope.lng);
    });
  }, 2000)



});
