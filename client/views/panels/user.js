

Template.panelUser.onRendered(function() {

	console.log('panelUser onRendered',this.data)

});

Template.panelUser.events({
	'click .nav-tabs a': function(e, tmpl) {
		e.preventDefault();
		$(e.currentTarget).tab('show');
	}
});
