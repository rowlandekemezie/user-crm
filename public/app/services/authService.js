(function() {
  'use strict';

  angular.module('authService', [])
  .factory('Auth', ['$http', '$q', 'AuthToken', function($http, $q, AuthToken) {
      var authFactory = {};
      authFactory.login = function(username, password) {
        // return promise object and its data
        return $http.post('/api/authenticate', {
          username: username,
          password: password
        })
        .success(function(data) {
          AuthToken.setToken(data.token);
          return data;
        });
      };
      // log a user out by clearing the token
      authFactory.logout = function() {
        AuthToken.setToken();
      };
      // check that a user is logged in
      authFactory.isLoggedIn = function() {
        if (AuthToken.getToken()) {
          return true;
        } else {
          return false;
        }
      };
      // get the  logged in user
      authFactory.getUser = function() {
        if (AuthToken.getToken()) {
         return $http.get('/api/me', {cache: true});
        } else {
        return $q.reject({
            message: 'User has no token'
          });
        }
      };
      // function to create sample user
      authFactory.createSampleUser = function(){
        $http.post('/api/sample');
      };
      return authFactory;
    }])
    // -------------------------------
    // get and set factory service
    //  inject $window to store token client-side
    .factory('AuthToken', ['$window', function($window) {
      var authTokenFactory = {};
      authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
      };
      // function to set or clear token from local
      // storage
      authTokenFactory.setToken = function(token) {
        if (token) {
          $window.localStorage.setItem('token', token);
        } else {
          $window.localStorage.removeItem('token');
        }
      };
      return authTokenFactory;
    }])
    // =============================================
    // application configuration to integrate token into requests
    .factory('AuthInterceptor', ['$q',
      '$location',
      'AuthToken',
      function($q, $location, AuthToken) {
      var interceptorFactory = {};
      interceptorFactory.request = function(config){
        // grab the token
        var token = AuthToken.getToken();
        // attach the token to the headers
        if (token) {
          config.headers['x-access-token'] = token;
        }
        return config;
      };
      // response error
      interceptorFactory.responseError = function(response){
      	// check forbidden error
      	if(response.status == 403){
          AuthToken.setToken();
      		$location.path('/login');
      	}
      	// return error from the server as a promise
      	return $q.reject(response);
      };
      return interceptorFactory;
    }]);
})();