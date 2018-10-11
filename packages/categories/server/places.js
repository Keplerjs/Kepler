
Meteor.methods({
	addCatsToPlace: function(placeId, cats) {
		if(!this.userId) return null;
		
		//TODO check user is owner
		
		cats = _.isArray(cats) ? cats : [cats];

		Places.update(placeId, { $addToSet: {'cats': {$each: cats} } });

		var placeCats = Places.findOne(placeId, {
			fields: {_id:0, cats:1}
		});

		console.log('Cats: addCatsToPlace', placeId);

		return placeCats;
	},
	removeCatsFromPlace: function(placeId, cats) {
		if(!this.userId) return null;

		//TODO check user is owner
		//
		cats = _.isArray(cats) ? cats : [cats];

		Places.update(placeId, { $pull: {'cats':  {$in: cats} } });

		console.log('Cats: removeCatsFromPlace', placeId);
	},
	cleanCatsFromPlace: function(placeId, cats) {
		if(!this.userId) return null;

		//TODO check user is owner

		Places.update(placeId, { $set: {'cats': [] } });

		console.log('Cats: cleanCatsFromPlace', placeId);
	}	
});