(function(){
	'use strict';
	// inject userService as a dependency
	angular.module('userCtrl', ['userService'])
	// inject user factory from userService
	.controller('userController', [
    'User',
    function(User){
		var vm = this;
		// set the spinner to true
		vm.processing = true;
		// grab all users
		User.all()
		.success(function(data){
			vm.processing = false;
			// bind the users returned to the controller
			vm.users = data;
		});
    vm.deleteUser = function(id){
      vm.processing = true;
      User.delete(id)
      .success(function(){
        User.all()
        .success(function(data){
          vm.processing = false;
          vm.users = data;
        });
      });
    };
	}])
  .controller('userCreateController', ['User', function(User){
      var vm = this;
      vm.type = 'create';
      // function to create a user
      vm.saveUser = function(){
        vm.processing = true;
        vm.message ='';
        User.create(vm.userData)
        .success(function(data){
          vm.processing = false;
          vm.userData = {};
          vm.message = data.message;
        });
      };
    }])
  .controller('userEditController', [
    '$routeParams',
    'User',
    function($routeParams, User){
    var vm = this;
    vm.type = 'edit';
    // get the user parameters
    User.get($routeParams.user_id)
    .success(function(data){
      vm.userData = data;
    });
    // function to save the updated user
    vm.saveUser = function(){
      vm.processing = true;
      vm.message = '';
      // post new user data using the update function provided
      //  by the userService
      User.update($routeParams.user_id, vm.userData)
      .success(function(data){
        vm.processing = false;
        vm.userData = {};
        vm.message = data.message;
      });
    };
    }]);
})();
