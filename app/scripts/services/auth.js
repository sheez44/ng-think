'use strict';

app.factory('Auth', function (FIREBASE_URL, $rootScope, $firebase, $firebaseAuth, $location, $q) {

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);
	console.log(auth);

	var Auth = {
		register: function (user) {
			return ref.createUser(user.email, user.password, function(error, userData) {
				if (error) {
					console.log("Error creating user: ", error);
				} else {
					console.log("Succesfully created user acount with uid: ", userData.uid);
				}
			});
		},
		login: function(user) {
			var deferred = $q.defer();
			ref.authWithPassword({"email": user.email, "password": user.password}, function(error, authData) {
				if (error) {
					deferred.reject(error);
				} else {
					deferred.resolve(authData);
					$location.path('/');
				}
			});
			return deferred.promise;
		},
		logout: function() {
			return auth.$unauth();
		},
		resolveUser: function() {
			return auth.$getAuth();
		},
		signedIn: function() {
			return !!Auth.user.provider;
		},
		user: {}
	}

	$rootScope.$on('$firebase:login', function(e, user) {
		console.log('logged in');
		angular.copy(user, Auth.user);
	});
	$rootScope.$on('$firebase:logout', function() {
		console.log('logged out');
		angular.copy({}, Auth.user);
	});

	return Auth;


});