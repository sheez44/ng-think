'use strict';

app.controller('NavCtrl', function($scope, $location, Post) {
	$scope.post = { url: 'http://', title: ''};

	$scope.submitPost = function () {
		Post.create($scope.post);	  
	};
});