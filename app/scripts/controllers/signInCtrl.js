angular.module('peopleDirectoryClientApp')
	.controller('SignInCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'AuthServices',
		function($rootScope, $scope, $location, $localStorage, AuthServices){
      //console.log($localStorage.token);
      	// Authentification
      	function successAuth(res) {
      		$localStorage.token = res.token;
          window.location = "#/peopleDirectory";
        }
        $scope.token = $localStorage.token;
        $scope.tokenClaims = AuthServices.getTokenClaims();
				$scope.isSignIn = true;
				$scope.login = function () {
					var credentials = {
      	  	username: $scope.username,
          	password: $scope.password
          };
      		AuthServices.signin(credentials, successAuth, function () {
      			$rootScope.error = 'Invalid credentials.';
						$rootScope.username = $scope.username;
      		})
      	};
      }]);
