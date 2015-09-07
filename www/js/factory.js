'use strict';

angular.module('weather.factory', []).factory('weather', function ($http) {
  return Object.defineProperties({
    getCurrentLocation: function getCurrentLocation(cb) {
      $http.get('http://ip-api.com/json').success(cb);
    },
    getCoord: function getCoord(location, cb) {
      $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location).success(cb);
    },
    getWeather: function getWeather(scale, lat, lng, cb) {
      //append units query to API url if scale === celcius
      var url = scale === 'C' ? '/api/forecast/' + lat + ',' + lng + '/?units=uk2' : '/api/forecast/' + lat + ',' + lng;
      $http.get(url).success(cb);
    },

    setFavorites: function setFavorites(favorites) {
      localStorage.savedCities = JSON.stringify(favorites);
    },
    getFavorites: function getFavorites() {
      var json = localStorage.savedCities ? JSON.parse(localStorage.savedCities) : [];
      return json;
    }
  }, {
    scale: {
      set: function set(scale) {
        localStorage.scale = scale;
      },
      get: function get() {
        return localStorage.scale;
      },
      configurable: true,
      enumerable: true
    },
    precision: {
      set: function set(precision) {
        localStorage.precision = precision;
      },
      get: function get() {
        return localStorage.precision;
      },
      configurable: true,
      enumerable: true
    }
  });
});