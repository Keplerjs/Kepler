
Places.after.update(function(userId, doc, fieldNames, modifier, options) {

	if(_.contains(fieldNames,'cats') && modifier['$addToSet']) {

		var catData = {},
			cats = modifier.$addToSet.cats.$each;

		_.each(cats, function(cat) {

			catData = _.extend({}, K.schemas.cat, {
				name: cat,
				type: 'place'//user, place, all
			});

			Categories.upsert({name: catData.name}, {
				$set: catData
			});
		});

		console.log('Cats: after update', cats);
	}

});

Meteor.publish('placesByCategory', function(cat) {
	if(this.userId) {
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
		
		cats = _.map(cats, K.Util.sanitize.fileName);

		console.log('addCatsToPlace',cats);

		var placeData = Places.findOne(placeId),
			placeCats = placeData.cats;

		if(placeData.userId === this.userId || (K.Admin && K.Admin.isMe())) {

			Places.update(placeId, { $addToSet: {'cats': {$each: cats} } });
			
			Users.update(this.userId, {
				$addToSet: {
					'catshist': {
						$each: cats,
						//$slice: K.settings.public.categories.catsHistLength
					}
				}
			});
			Users.update({
				_id: this.userId,
				'catshist': { $size: K.settings.public.categories.catsHistLength+1 }
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

			Places.update(placeId, { $pull: {'cats':  {$in: cats} } });

			console.log('Cats: removeCatsFromPlace', placeId, cats);
		}
	}	
});