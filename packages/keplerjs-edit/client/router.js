
Router.map(function() {

	this.route('panelPlaceEdit', {
		path: '/place/:placeId/edit',
		template: 'panelPlaceEdit',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('placeById', this.params.placeId);
		},
		data: function() {
			if(!this.ready()) return null;
			var place = K.placeById( this.params.placeId );

			if(!place){
				Router.go('root');
				return null;
			}

			return place.rData();
		}
	});
	
});