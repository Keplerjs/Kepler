
Template.layoutMap.events({
	'click .sidebar-close': function(e, tmpl) {
		e.preventDefault();
		tmpl.$('#sidebar').toggleClass('collapsed');//.slideToggle('fast');
	}
});

Template.buttonStatus.events({
	'click a': function(e) {
		Meteor.reconnect();
	}
});
