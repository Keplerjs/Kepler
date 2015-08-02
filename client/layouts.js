
Template.layoutMap.events({
	'click .sidebar-close': function(e, tmpl) {
		tmpl.$('#sidebar').addClass('collapsed');
	}
});

Template.buttonStatus.events({
	'click a': function(e) {
		Meteor.reconnect();
	}
});
