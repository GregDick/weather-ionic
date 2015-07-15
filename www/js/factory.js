angular.module('weather.factory', [])
.factory('Weather', function($http){
  return{
    getCoord: function(location, cb){
      $http
        .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}`)
        .success(cb)
    },
    getWeather: function(lat, lng, cb){
      $http
        .get(`/api/forecast/${lat},${lng}`)
        .success(cb)
    },
    scale: 'farenheit',
    precision: 2
  };
});
