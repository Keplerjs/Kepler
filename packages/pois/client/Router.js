
Router.map(function() {

	this.route('placePois', {
		path: '/place/:placeId/pois',
		template: 'empty',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', false);
			return Meteor.subscribe('poisByPlace', this.params.placeId);
		},
		onAfterAction: function() {
			var place = K.placeById( this.params.placeId );
			if(place) {
				place.showLoc();
				place.showPois();
			}
		}
	});

});