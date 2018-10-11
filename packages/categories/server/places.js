
Meteor.methods({
	addCatsToPlace: function(placeId, cats) {
		if(!this.userId) return null;
		
		//TODO check user is owner
		
		Places.update(placeId, { $addToSet: {'cats': cats } });

		var placeCats = Places.findOne(placeId, {
			fields: {_id:0, cats:1}
		});

		return placeCats;
	},
	removeCatsFromPlace: function(placeId, cats) {
		if(!this.userId) return null;

		Places.update(placeId, { $pull: {'cats': cats } });
	},
	cleanCatsFromPlace: function(placeId, cats) {
		if(!this.userId) return null;

		Places.update(placeId, { $set: {'cats': [] } });
	}	
});