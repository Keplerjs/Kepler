
Places.after.remove(function(userId, doc) {
	if(doc.cats && doc.cats.length) {
		Categories.update({name: {$in: doc.cats}, type: 'place'}, {
			$inc: {rank: -1}
		},{multi:true});
	}
});

Places.after.insert(function(userId, doc) {
	if(doc.cats && doc.cats.length) {
		_.each(doc.cats, function(cat) {

			let catData = _.extend({}, K.schemas.cat, {
				name: cat,
				type: 'place'
			});
			delete catData.rank;//path to maintain last value if just exists

			Categories.upsert({
				type: 'place',
				name: cat
			}, {
				$set: catData,
				$inc: {rank: 1}
			});		
		});
	}
});


Meteor.publish('placesByCategory', function(cat) {
	if(this.userId || K.settings.public.router.publicRoutes.placesCats) {
		var cur = K.findPlacesByCategory(cat);
		console.log('Pub: placesByCategory', cat);
		return cur;
	}
	else
		this.ready();	
});

Meteor.methods({
	addCatsToPlace: function(placeId, cats) {
		if(!this.userId) return null;
		
		cats = _.isArray(cats) ? cats : [cats];
		
		cats = _.map(cats, K.Util.sanitize.catName);

		console.log('addCatsToPlace',cats);

		var placeData = Places.findOne(placeId),
			placeCats = placeData.cats;

		if(placeData.userId === this.userId || (K.Admin && K.Admin.isMe())) {

			Places.update(placeId, {
				$addToSet: {'cats': {$each: cats} }
			});

			_.each(cats, function(cat) {
				let catData = _.extend({}, K.schemas.cat, {
					name: cat,
					type: 'place'
				});
				delete catData.rank;//path to maintain last value fi just exists

				Categories.upsert({name: cat, type: 'place'}, {
					$set: catData,
					$inc: {rank:1}
				});
			});

			Users.update(this.userId, {
				$addToSet: {
					'catshist': {
						$each: cats,
						//$slice: K.settings.public.categories.catsHistLength
					}
				}
			});
			var maxcatshist = K.settings.public.categories.catsHistLength*3;
			Users.update({
				_id: this.userId,
				'catshist': { $size: maxcatshist }
			}, {
				$pop: { 'catshist': -1 }
			});

			console.log('Cats: addCatsToPlace', placeId, cats);
		}
	},
	removeCatsFromPlace: function(placeId, cats) {
		if(!this.userId) return null;

		//TODO check user is owner
		//
		cats = _.isArray(cats) ? cats : [cats];

		var placeData = Places.findOne(placeId),
			placeCats = placeData.cats;

		if(placeData.userId === this.userId || (K.Admin && K.Admin.isMe())) {

			Places.update(placeId, {
				$pull: {'cats':  {$in: cats} }
			});

			Categories.update({name: {$in: cats}, type: 'place'}, {
				$inc: {rank: -1} 
			},{multi:true});

			console.log('Cats: removeCatsFromPlace', placeId, cats);
		}
	}	
});