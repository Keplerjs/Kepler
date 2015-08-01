/*
Template.panelPlace.helpers({
	place: function() {
		if( Session.get('panelPlaceId') )
			return Climbo.newPlace( Session.get('panelPlaceId') );
	}
});
*/
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
