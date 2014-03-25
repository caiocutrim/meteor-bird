winston = Meteor.require('winston');
winston.add(winston.transports.File, { 
	filename: '../application.log',
	maxsize: 1024
});

Meteor.startup(function() {
	//Post.remove({});
	//Meteor.users.remove({});
	console.log("Iniciando Meteor Bird");
});