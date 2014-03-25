Accounts.onCreateUser(function(options, user) {
	if (user.services.facebook) {
		var facebook = user.services.facebook;
		user['profile'] = {
			name: facebook.name
		};
	}
	return user;
});