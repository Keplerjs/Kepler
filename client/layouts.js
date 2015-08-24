
Template.layoutMap.onRendered(function() {
	Climbo.ui.sidebar = this.$('#sidebar');
});

Template.layoutMap.helpers({
	sidebarExpanded: function() {
		return Router.current().route.getName()!=='map';
	}
});


Template.buttonStatus.events({
	'click a': function(e) {
		Meteor.reconnect();
	}
});


