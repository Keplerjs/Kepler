
Router.map(function() {

	this.route('placeTracks', {
		path: '/place/:placeId/tracks/:trackId?',
		template: 'empty',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', false);
			return Meteor.subscribe('tracksByPlace', this.params.placeId);
		},
		onAfterAction: function() {
			if(!this.ready()) return null;

			var place = K.placeById( this.params.placeId );

			if(place) {
				place.showLoc(function() {
					Router.go('map');	
				});
				place.showTracks(this.params.trackId);
			}
		}
	});

});