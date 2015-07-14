angular
.module('weather.search', [])

.controller('SearchCtrl', function($scope, $stateParams, Weather) {

  $scope.locationChanged = _.debounce(function(){
    Weather.getCoord($scope.location, function(data){
      $scope.cityInfo = [];
      $scope.cityArray = data.results;
      $scope.cityArray.forEach(function(cityObject){
        $scope.cityInfo.push(cityObject.formatted_address);
        // $scope.cityInfo.city['lat'] = cityObject.geometry.location.lat;
        // $scope.cityInfo.city['lng'] = cityObject.geometry.location.lng;
      })
      console.log($scope.cityArray);
      console.log($scope.cityInfo);
    });
  }, 1200)



});
