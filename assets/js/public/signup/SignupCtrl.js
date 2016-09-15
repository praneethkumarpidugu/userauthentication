/**
 * Created by praneethkumar on 07/09/16.
 */
angular
  .module('SignupMod')
  .controller('SignupCtrl', ['$scope','$http', function ($scope, $http) {
    console.log('signup controller is initialized');

    $scope.runSignup = function () {
      console.log('Signing up ' + $scope.name);
      $http.post('/signup', {
        name: $scope.name,
        email:$scope.email,
        password:$scope.passwords
      })
        .then(function onSuccess(response) {
          window.location = '/user'
        })
        .catch(function onError(err) {
          console.log('Error ' + err);
        })
    }
  }]);
