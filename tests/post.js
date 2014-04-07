var assert = require("assert");

suite("Post", function() {

	test("publish", function(done, srv, cli) {
		
		srv.eval(function() {
			Accounts.createUser({
				email: "a@a.com",
				password: "123456"
			});
			Post.find().observe({
				added: function(obj) {
					emit("added", obj);
				}
			});
		});

		srv.once("added", function(obj) {
			assert.equal(obj.message, "Hello!");
			done();
		});

		cli.eval(function() {
			Meteor.loginWithPassword("a@a.com","123456", function() {
				Meteor.call("publishPost", "Hello!");
			});
		});

	});

});