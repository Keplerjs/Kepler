
Template.buttonStatus.events({
	'click a': function(e) {
		Meteor.reconnect();
	}
});


