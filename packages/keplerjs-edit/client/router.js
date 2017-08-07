
Router.map(function() {

	this.route('panelEdit', {
		path: '/place/:placeId/edit',
		template: 'panelEdit',
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