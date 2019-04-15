
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

		_.each(cats, function(cat) {
			catData = _.extend({}, K.schemas.cat, {
				name: cat,
				type: 'user'
			});
			delete catData.rank;//path to maintain last value

			Categories.upsert({name: cat, type: 'user'}, {
				$set: catData,
				$inc: {rank:1}
			});
		});
	},
	removeCatsFromUser: function(userId, cats) {
		
		if(!K.Admin.isMe()) return false;
		
		cats = _.isArray(cats) ? cats : [cats];

		Users.update(userId, { $pull: {'cats':  {$in: cats} } });
		
		Categories.update({name: {$in: cats}, type: 'user'}, {
				$inc: {rank: -1} 
			},{multi:true});

		console.log('Cats: removeCatsFromPlace', userId, cats);
	},
	cleanCatsByPlace: function(placeId, cats) {

		if(!K.Admin.isMe()) return false;

		Places.update(placeId, { $set: {'cats': [] } });

		console.log('Cats: cleanCatsByPlace', placeId);
	},
	cleanAllCatsByType: function(type) {

		if(!K.Admin.isMe()) return false;

		if(type==='place')
			Places.update({}, { $set: {'cats': [] } },{multi:true});
		else if(type==='user')
			Users.update({}, { $set: {'cats': [] } },{multi:true});
		else
			return false;

		Categories.update({type: type}, { $set: {rank: 0 } }, {multi:true});

		console.log('Cats: cleanAllCatsPlaces');
	},
	cleanCatsOrphan: function() {

		if(!K.Admin.isMe()) return false;

		Categories.remove({rank: {$lt: 1} });

		console.log('Cats: cleanCatsOrphan');
	},	
	cleanCatsByUser: function(userId, cats) {

		if(!K.Admin.isMe()) return false;

		Users.update(userId, { $set: {'cats': [] } });

		console.log('Cats: cleanCatsByUser', userId);
	}
});
