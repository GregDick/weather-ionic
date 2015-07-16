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
    },
    setFavorites : function(favorites){
      localStorage.savedCities = JSON.stringify(favorites);
    },
    getFavorites : function(){
      var json = localStorage.savedCities ? JSON.parse(localStorage.savedCities) : [{
        city: 'New York, NY, USA',
        lat: 40.7127837,
        lng: -74.0059413
      }];
      return json;
    }
  };
});
