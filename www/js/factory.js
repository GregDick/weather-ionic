angular.module('weather.factory', [])
.factory('Weather', function($http){
  return{
    getCoord(location, cb){
      $http
        .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}`)
        .success(cb)
    },
    getWeather(lat, lng, cb){
      $http
        .get(`/api/forecast/${lat},${lng}`)
        .success(cb)
    }
  }
});
