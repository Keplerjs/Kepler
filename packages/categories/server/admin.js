
if(K.Admin)
K.Admin.methods({
	removeCat: function(cat, type) {
		
		if(!K.Admin.isMe()) return false;

		Categories.remove({name: cat, type: type});

		console.log('Cats: removeCat', cat, type);
	},
	addCatsToUser: function(userId, cats) {
		
		if(!K.Admin.isMe()) return false;

		cats = _.map(cats, K.Util.sanitize.fileName);

		Users.update(userId, { $addToSet: {'cats': {$each: cats} } });

		userCats = Users.findOne(userId, {
			fields: {_id:0, cats:1}
		}).cats;

		console.log('Cats: addCatsToUser', userId, cats);

		return userCats;
	},
	removeCatsFromUser: function(userId, cats) {
		
		if(!K.Admin.isMe()) return false;
		
		cats = _.isArray(cats) ? cats : [cats];

		Users.update(userId, { $pull: {'cats':  {$in: cats} } });
		
		console.log('Cats: removeCatsFromPlace', userId, cats);
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
