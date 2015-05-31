'use strict';

app.factory('Post', function($firebase, FIREBASE_URL, $firebaseObject, $firebaseArray) {
	var ref = new Firebase(FIREBASE_URL);
	var posts = $firebaseArray(ref.child('posts'));

	var Post = {
		all: posts,
		create: function (post) {
			return posts.$add(post);
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