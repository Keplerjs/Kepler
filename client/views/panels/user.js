
Template.panel_user.helpers({
	user: function() {
		if( Session.get('panelUserId') )
			return Climbo.newUser( Session.get('panelUserId') ).rData();
	}
});

Template.panel_user.events({
	'click .nav-tabs a': function(e, tmpl) {
		e.preventDefault();
		$(e.currentTarget).tab('show');
	}
});
