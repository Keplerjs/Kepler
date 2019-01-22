
if(K.Admin)
K.Admin.methods({
	removeCat: function(name, type) {
		
		if(!K.Admin.isMe()) return false;

		name = K.Util.sanitize.regExp(name);

		Categories.remove({name: name, type: type});

		console.log('Cats: removeCat', name, type);
	},
	insertCat: function(name, type) {
		
		if(!K.Admin.isMe()) return false;

		name = K.Util.sanitize.catName(name);

		try {
			
			Categories.insert(_.extend({}, K.schemas.cat, {
				name: name,
				type: type
			}));

		} catch(e) {
			throw new Meteor.Error(500, i18n('error_cats_exists',name) );
			return null;
		}

		console.log('Cats: insertCat', name, type);
	},	
	addCatsToUser: function(userId, cats) {
		
		if(!K.Admin.isMe()) return false;

		cats = _.isArray(cats) ? cats : [cats];

		cats = _.map(cats, K.Util.sanitize.catName);

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
