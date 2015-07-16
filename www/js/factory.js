angular.module('weather.factory', [])
.factory('weather', function($http){
  return{
    getCoord: function(location, cb){
      $http
        .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}`)
        .success(cb)
    },
    getWeather: function(scale, lat, lng, cb){
      //append units query to API url if scale === celcius
      var url = scale === 'C' ? `/api/forecast/${lat},${lng}/?units=uk2` : `/api/forecast/${lat},${lng}`;
      $http
        .get(url)
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
