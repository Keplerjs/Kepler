
Template.layoutMap.events({
	'click .sidebar-close': function(e, tmpl) {
		//tmpl.$('#sidebar').addClass('collapsed');
		tmpl.$('#sidebar > .tab-content').slideToggle('fast');
	},
	'click .sidebar-close': function(e, tmpl) {
		//tmpl.$('#sidebar').addClass('collapsed');
		tmpl.$('#sidebar > .tab-content').slideToggle('fast');
	}
});

Template.buttonStatus.events({
	'click a': function(e) {
		Meteor.reconnect();
	}
});
