(function() {
  'use strict';

  angular.module('mainCtrl', [])
  .controller('mainController', [
    '$rootScope',
    '$location',
     'Auth',
     function($rootScope, $location, Auth) {
    var vm = this;
    // check that a user is logged in
    vm.loggedIn = Auth.isLoggedIn();
    // check that that  a user is logged in with each request
    $rootScope.$on('$routeChangeStart', function() {
      vm.loggedIn = Auth.isLoggedIn();
      // get the user details
      Auth.getUser().then(function(data) {
        vm.user = data.data;
      });
    });
    // function to submit form
    vm.doLogin = function() {
      vm.processing = true;
      vm.error = '';
      Auth.login(vm.loginData.username, vm.loginData.password)
      .success(function(data) {
        vm.processing = false;
        // if user successfuly logs in, redirect to users page
        if (data.success) {
          $location.path('/users');
        } else {
          vm.error = data.message;
        }
      });
    };
    // function to logout user
    vm.doLogout = function() {
      Auth.logout();
      vm.user = '';
      $location.path('/login');
    };
    // create sammple user
    vm.createSample = function() {
      Auth.createSampleUser();
    };
  }]);
})();