
Template.status.events({
	'click a': function(e) {
		Meteor.reconnect();
	}
});


