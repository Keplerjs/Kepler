
Template.panelPlaces.onRendered(function() {
	var self = this;

	$(self.firstNode).parent().siblings('.list-items').btsListFilter('.places-search', {
		itemChild: '.place-btn-name',
		loadingClass: 'loading-lg',
		resetOnBlur: false,
		sourceData: function(val, cb) {
			
			Meteor.subscribe('placesByText', val, function() {
			
				var places = _.map( K.findPlacesByText(val).fetch(), function(place) {
					return K.placeById(place._id);
				});

				cb(places);
			});
		},
		sourceNode: function(data) {
			var item$ = $('<li class="list-group-item"></li>');
			Blaze.renderWithData(Template.item_place_search, data, item$[0]);
			return item$;
		},
		cancelNode: function() {
			return self.$('.search-canc');
		}
	});
});
