
Meteor.methods({
	addFavorite: function(placeId) {

		if(!this.userId) return null;

		Places.update(placeId, {$inc: {rank: 1} });
		Users.update(this.userId, {$addToSet: {favorites: placeId} });
		
		console.log('Profile: addFavorite', this.userId, placeId);
	},
	removeFavorite: function(placeId) {
		
		if(!this.userId) return null;

		Places.update({_id: placeId, rank: {$gt: 0} }, {$inc: {rank: -1} });
		Users.update(this.userId, {$pull: {favorites: placeId} });
		
		console.log('Profile: removeFavorite', this.userId, placeId);
	}
});