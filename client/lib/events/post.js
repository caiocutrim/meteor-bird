Template.post.events({
  "submit form": function(e, template) {
  	e.preventDefault();
  	var textarea = template.find("textarea");
  	Meteor.call("publishPost", textarea.value);
  	textarea.value = "";
  }
});