
Router.map(function() {

	this.route('placeTracks', {
		path: '/place/:placeId/tracks',
		template: 'empty',
		waitOn: function() {
			return Meteor.subscribe('tracksByPlace', this.params.placeId);
		},
		onAfterAction: function() {
			var place = K.placeById( this.params.placeId );

			if(place)
				place.showTracks();
		},
		data: { hideSidebar: true }
	});

});