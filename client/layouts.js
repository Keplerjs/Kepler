
Template.layoutMap.onRendered(function() {
	Climbo.ui.sidebar = this.$('#sidebar');
});

Template.buttonStatus.events({
	'click a': function(e) {
		Meteor.reconnect();
	}
});
