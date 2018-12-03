
if(K.Admin)
K.Admin.methods({

	addCatsToUser: function(userId, cats) {
		
		if(!K.Admin.isMe()) return false;

		cats = K.Cats.sanitize(cats,'user');

		Users.update(userId, { $addToSet: {'cats': {$each: cats} } });

		userCats = Users.findOne(userId, {
			fields: {_id:0, cats:1}
		}).cats;

		console.log('Cats: addCatsToUser', userId);

		return userCats;
	},
	removeCatsByUser: function(userId, cats) {
		
		if(!K.Admin.isMe()) return false;
		
		cats = _.isArray(cats) ? cats : [cats];

		var placeData = Users.findOne(userId),
			placeCats = placeData.cats;

		if(placeData.userId === this.userId) {

			Users.update(userId, { $pull: {'cats':  {$in: cats} } });
			
			placeCats = Users.findOne(userId, {
				fields: {_id:0, cats:1}
			}).cats;

			console.log('Cats: removeCatsFromPlace', userId);
		}

		return placeCats;
	},
	cleanCatsByPlace: function(placeId, cats) {

		if(!K.Admin.isMe()) return false;

		Places.update(placeId, { $set: {'cats': [] } });

		console.log('Cats: cleanCatsByPlace', placeId);
	},
	cleanCatsByUser: function(userId, cats) {

		if(!K.Admin.isMe()) return false;

		Users.update(userId, { $set: {'cats': [] } });

		console.log('Cats: cleanCatsByUser', userId);
	}
});