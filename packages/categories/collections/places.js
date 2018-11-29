
K.extend({
	findPlacesByCategory: function(cat) {
		return Places.find({
			cats: cat
		}, K.filters.placeItem);
	}
});