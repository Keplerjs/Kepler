
Template.btnConnect.events({
	'click a': function(e) {
		e.preventDefault();
		var status = Meteor.status();
		if(status.connected)
			Meteor.disconnect();
		else
			Meteor.reconnect();
	}
});


