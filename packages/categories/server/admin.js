
if(K.Admin)
K.Admin.methods({
	removeCat: function(cat, type) {
		
		if(!K.Admin.isMe()) return false;

		cat = K.Util.sanitize.regExp(cat);

		Categories.remove({name: cat, type: type});

		if(type==='user') {
			Users.update({cats: cat }, {
				$pull: {cats: cat }
			},{multi:true});
		}
		else if(type==='place') {
			Places.update({cats: cat }, {
				$pull: {cats: cat }
			},{multi:true});
		}

		Users.update({catshist: cat }, {
			$pull: {catshist: cat }
		},{multi:true});

		console.log('Cats: removeCat', cat, type);
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

			Categories.upsert({
				name: cat,
				type: 'user'
			}, {
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
	removeCatsOrphan: function() {

		if(!K.Admin.isMe()) return false;

		Categories.remove({rank: {$lt: 1} });

		console.log('Cats: cleanCatsOrphan');
	},		
	updateCatsCountsByType: function(type) {
		if(!K.Admin.isMe()) return false;

		type = type || 'place';

		var coll = (type==='user') ? Users : Places;

		var n = 0;
		Categories.find({
			type: type
		}).forEach(function(cat) {

			let count = coll.find({cats: cat.name}).count();

			n += Categories.update({
					name: cat.name,
					type: type,
					rank: {$ne: count}
				}, {
					$set: {
						rank: count
					}
				});
			//console.log(n, cat, count)
		});
		
		console.log('Cats: updateAllCatsCounts', type, n);
	},
	cleanCatsByPlace: function(placeId, cats) {

		if(!K.Admin.isMe()) return false;

		Places.update(placeId, { $set: {'cats': [] } });

		console.log('Cats: cleanCatsByPlace', placeId);
	},
	cleanAllCatsByType: function(type) {

		if(!K.Admin.isMe()) return false;

		type = type || 'place';

		if(type==='place')
			Places.update({}, { $set: {'cats': [] } },{multi:true});
		else if(type==='user')
			Users.update({}, { $set: {'cats': [] } },{multi:true});
		else
			return false;

		Categories.update({type: type}, { $set: {rank: 0 } }, {multi:true});

		console.log('Cats: cleanAllCatsPlaces');
	},
	cleanCatsByUser: function(userId, cats) {

		if(!K.Admin.isMe()) return false;

		Users.update(userId, { $set: {'cats': [] } });

		console.log('Cats: cleanCatsByUser', userId);
	}
});
