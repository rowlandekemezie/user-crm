(function() {
  'use strict';

  angular.module('userService', [])
  .factory('User', ['$http', function($http) {
    var userFactory = {};
    userFactory.all = function() {
      return $http.get('/api/users/');
    };
  	userFactory.get = function(id){
  		return $http.get('/api/users/' + id);
  	};
  	userFactory.create  = function(userData){
  		return $http.post('/api/users/', userData);
  	};
  	userFactory.update = function(id, userData){
  		return $http.put('/api/users/' + id, userData);
  	};
  	userFactory.delete = function(id){
  		return $http.delete('/api/users/' + id);
  	};
    return userFactory;
  }]);
})();