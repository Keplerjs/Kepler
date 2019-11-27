
Router.map(function() {

	this.route('placeTracks', {
		path: '/place/:placeId/tracks',
		template: 'empty',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', false);
			return Meteor.subscribe('tracksByPlace', this.params.placeId);
		},
		onAfterAction: function() {
			var place = K.placeById( this.params.placeId );
			if(place) {
				place.showLoc(function() {
					Router.go(K.settings.public.router.mainRoute);	
				});
				place.showTracks();
			}
		}
	});

});