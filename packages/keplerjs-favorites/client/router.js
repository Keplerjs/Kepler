
Router.map(function() {

	this.route('favorites', {
		path: '/favorites',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('placesByIds', K.Profile.data.favorites);
		},
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('title_favorites'),
				className: 'favorites',
				itemsTemplate: 'item_place_favorite',
				items: _.map(K.Profile.data.favorites, function(id) {
					var place = K.placeById(id);
					place.update();
					return place.rData();
				}),
				sortBy: 'name'
			};
		}
	});
	
});