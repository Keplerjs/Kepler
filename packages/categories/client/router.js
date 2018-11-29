Router.map(function() {

	this.route('placesCats', {
		path: '/places/cat/:cat',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('placesByCategory', this.params.cat);
		},
		data: function() {
			if(!this.ready()) return null;
			
			var places = K.findPlacesByCategory(this.params.cat).fetch();

			return {
				title: i18n('label_cats_place'),
				className: 'placesCats',
				//headerTemplate: 'search_cats',
				itemsTemplate: 'item_place_search',
				items: _.map(places, function(place) {
					return K.placeById(place._id);
				})
			};
		}
	});
});
