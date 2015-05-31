'use strict';

app.factory('Post', function($firebase, FIREBASE_URL, $firebaseObject, $firebaseArray, $location) {
	var ref = new Firebase(FIREBASE_URL);
	var posts = $firebaseArray(ref.child('posts'));

	var Post = {
		all: posts,
		create: function (post) {
			return posts.$add(post).then(function(ref) {
				$location.path('/posts/' + ref.key());
			});
		},
		get: function(postId) {
			return $firebaseObject(ref.child('posts').child(postId));
		},
		delete: function(post) {
			return posts.$remove(post);
		}
	}

	return Post;

});