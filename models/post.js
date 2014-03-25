Post = new Meteor.Collection('posts');

Post.publish = function(message) {
	var currentUser = Meteor.user();
	var params = {
		message: message,
		time: new Date(),
		userId: currentUser._id,
		name: currentUser.profile.name
	};
	this.insert(params);
	winston.info("Post.publish: ", params);
};

Post.list = function(userIds) {
	return this.find(
		{userId: {"$in": userIds}},
		{sort: {time: -1, name: 1}}
	);
};