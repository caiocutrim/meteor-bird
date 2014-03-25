Meteor.methods({
	profileUpdate: function(name, about) {
		Meteor.users.update(
			{ _id: Meteor.userId() },
			{	$set: {
				"profile.name": name,
				"profile.about": about
			}}
		);
	},
	publishPost: function(message) {
		Post.publish(message);
	},
	followUser: function(friendId) {
		Friendship.follow(friendId);
	},
	unfollowUser: function(friendId) {
		Friendship.unfollow(friendId);
	}
});