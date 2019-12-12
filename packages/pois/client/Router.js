
Router.map(function() {

	this.route('placePois', {
		path: '/place/:placeId/pois/:poisType?',//type is optional param
		template: 'empty',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', false);
			return Meteor.subscribe('poisByPlace', this.params.placeId);
		},
		onAfterAction: function() {
			if(!this.ready()) return null;
			
			var place = K.placeById( this.params.placeId );

			if(place) {
				place.showLoc(function() {
					Router.go('map');	
				});
				place.showPois(this.params.poisType);
			}
		}
	});

});