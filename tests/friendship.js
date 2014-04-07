var assert = require("assert");

suite("Friendship", function() {

	test("follow", function(done, srv, cli) {
		
		srv.eval(function() {
			Friendship.find().observe({
				added: function(obj) {
					emit("added", obj);
				}
			});
		});

		srv.once("added", function(obj) {
			assert.equal(obj.friendId, "123");
			assert.equal(obj.userId, this.userId);
			done();
		});

		cli.eval(function() {
			Meteor.call("followUser", "123");
		});

	});

	test("unfollow", function(done, srv, cli) {
		
		srv.eval(function() {
			Friendship.follow("123");
			Friendship.find().observe({
				removed: function(obj) {
					emit("removed", obj);
				}
			});
		});

		srv.once("removed", function(obj) {
			assert.equal(obj.friendId, "123");
			assert.equal(obj.userId, this.userId);
			done();
		});

		cli.eval(function() {
			Meteor.call("unfollowUser", "123");
		});

	});

	test("isFollowing", function(done, srv) {
		
		srv.eval(function() {
			Friendship.follow("123");
			var user1 = Friendship.isFollowing("123");
			var user2 = Friendship.isFollowing("321");
			emit("check", user1, user2);
		});

		srv.once("check", function(user1, user2) {
			assert.ok(user1);
			assert.equal(user2, undefined);
			done();
		});

	});

	test("timelineIds", function(done, srv, cli) {

		srv.eval(function() {
			Friendship.follow("1");
			Friendship.follow("2");
			Friendship.follow("3");
			
			var ids = Friendship.timelineIds(this.userId);
			emit('list', ids);
		});

		srv.once("list", function(ids) {
			assert.equal(ids.length, 4);
			assert.equal(ids[0], "1");
			assert.equal(ids[1], "2");
			assert.equal(ids[2], "3");
			assert.equal(ids[3], this.userId);
			done();
		});

	});

});