'use strict';

app.controller('PostsCtrl', function ($scope, Post, $location) {
	$scope.posts = Post.all;

	$scope.post = { url: 'http://', title: ''};

	$scope.submitPost = function () {
		Post.create($scope.post);	  
	}

	$scope.deletePost = function(post) {
		Post.delete(post);
	}
});