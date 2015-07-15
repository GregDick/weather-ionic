angular.module('weather.factory', [])
.factory('weather', function($http){
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
    set scale(scale){
      localStorage.scale = scale;
    },
    get scale(){
      return localStorage.scale;
    },
    set precision(precision){
      localStorage.precision = precision;
    },
    get precision (){
      return localStorage.precision;
    }
  };
});
