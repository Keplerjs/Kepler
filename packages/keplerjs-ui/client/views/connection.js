
Template.connection.events({
	'click a': function(e) {
		Meteor.reconnect();
	}
});


