/*
	//TODO use .include
*/
_.extend(K.Profile, {
	addFavorite: function(placeId) {
		Meteor.call('addFavorite', placeId);
		return this;
	},
	removeFavorite: function(placeId) {
		Meteor.call('removeFavorite', placeId);
		return this;
	}
});