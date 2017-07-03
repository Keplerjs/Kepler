
Router.map(function() {

	this.route('placePois', {
		path: '/place/:placeId/pois',
		template: 'empty',
		waitOn: function() {
			return Meteor.subscribe('poisByPlace', this.params.placeId);
		},
		onAfterAction: function() {
			var place = K.newPlace( this.params.placeId );

			if(place)
				place.showPois();
		},
		data: { hideSidebar: true }
	});

});