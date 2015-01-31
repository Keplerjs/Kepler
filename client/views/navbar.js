
Template.navbar.helpers({
	title: function() {
		return Climbo.i18n.ui.titles[ Router.current().route.getName() ];
	}
});

Template.navbar.events({
	'click #navbar-btn-back': function(e,tmpl) {
		e.preventDefault();
		window.history.back();
	}
});
