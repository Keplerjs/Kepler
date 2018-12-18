
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

			placeCats = Places.findOne(placeId, {
				fields: {_id:0, cats:1}
			}).cats;

			console.log('Cats: addCatsToPlace', placeId, cats);
		}

		return placeCats;
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
			
			placeCats = Places.findOne(placeId, {
				fields: {_id:0, cats:1}
			}).cats;

			console.log('Cats: removeCatsFromPlace', placeId);
		}

		return placeCats;
	}	
});