(function() {
  'use strict';

  angular.module('app.routes', ['ngRoute'])
  .config([
   '$routeProvider',
   '$locationProvider',
   function($routeProvider, $locationProvider) {

    $routeProvider
    // home page
    .when('/', {
      templateUrl: 'app/views/pages/home.html',
    })
    // login page
    .when('/login', {
      templateUrl: 'app/views/pages/login.html',
      controller: 'mainController',
      controllerAs: 'login'
    })
    // create users page
    .when('/users',{
      templateUrl: 'app/views/pages/users/all.html',
      controller: 'userController',
      controllerAs: 'user'
    })
    // create user page
    .when('/users/create', {
      templateUrl: 'app/views/pages/users/single.html',
      controller: 'userCreateController',
      controllerAs: 'user'
    })
    // edit user page
    .when('/users/:user_id', {
      templateUrl: 'app/views/pages/users/single.html',
      controller: 'userEditController',
      controllerAs: 'user'
    });
    // get ride of the hash in the url
    $locationProvider.html5Mode(true);
  }]);
})();