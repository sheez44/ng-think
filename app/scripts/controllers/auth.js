'use strict';

app.controller('AuthCtrl', function ($rootScope, $scope, $location, Auth) {
    if (Auth.signedIn()) {
      $location.path('/');
    }

    $scope.errorMessage = function() {
      $scope.errors = $rootScope.errors; 
    };
    

    $scope.login = function () {
      Auth.login($scope.user).then(function(data) {
        console.log(data);
      });
    };

  $scope.register = function () {
    Auth.register($scope.user).then(function() {
      return Auth.login($scope.user).then(function() {
        $location.path('/');
      });
    });
  };
});