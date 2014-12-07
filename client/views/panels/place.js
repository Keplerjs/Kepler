
Template.panel_place.helpers({
	place: function() {
		if( Session.get('panelPlaceId') )
			return Climbo.newPlace( Session.get('panelPlaceId') );
	}
});

Template.panel_place.events({	
	'click .place-btn-weather': function(e, tmpl) {
		e.preventDefault();
		this.loadWeather();
	},
	'click .nav-tabs a': function(e, tmpl) {
		e.preventDefault();
		$(e.currentTarget).tab('show');
	}
});
