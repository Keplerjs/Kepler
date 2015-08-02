

Template.panelPlace.onRendered(function() {

	console.log('panelPlace onRendered',this.data)

});

Template.panelPlace.events({	
	'click .place-btn-weather': function(e, tmpl) {
		e.preventDefault();
		this.loadWeather();
	},
	'click .nav-tabs a': function(e, tmpl) {
		e.preventDefault();
		$(e.currentTarget).tab('show');
	}
});
