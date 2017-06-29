
K.admin.addMethods({
	cleanPlaceHist: function(placeName) {
		
		if(!K.admin.isMe()) return null;

		var placeData = Places.findOne({name: placeName}),
			placeId = placeData._id;

		if(placeData.hist)
			Users.update({_id: {$in: placeData.hist }}, {$pull: {hist: placeId} });
		Places.update(placeId, {
			$set: {
				hist: []
			}
		});
	},
	cleanPlaceCheckins: function(placeName) {
		
		if(!K.admin.isMe()) return null;

		var placeData = Places.findOne({name: placeName}),
			placeId = placeData._id;

		if(placeData.checkins)
			Users.update({_id: {$in: placeData.checkins }}, {$set: {checkin: null} });
		Places.update(placeId, {
			$set: {
				checkins: []
			}
		});
	},
	cleanAllHist: function() {
		
		if(!K.admin.isMe()) return null;

		Users.update(true, {$set: {hist: []} });
		Places.update(true, {$set: {hist: []} });
	},	
	cleanAllCheckins: function() {
		
		if(!K.admin.isMe()) return null;

		Users.update(true, {$set: {checkin: null} });
		Places.update(true, {$set: {checkins: []} });
	},
	cleanAllFavorites: function() {
		
		if(!K.admin.isMe()) return null;

		Users.update(true, {$set: {favorites: []} });
		Places.update(true, {$set: {rank: 0} });
	},
	delPlace: function(placeId) {

		if(!K.admin.isMe()) return null;

		Places.remove(placeId);
	},
	clonePlace: function(placeId) {

		if(!K.admin.isMe()) return null;

		var place = getPlaceById(placeId).fetch()[0],
			offset = 0.01;

		place.loc[0] += offset;
		place.loc[1] += offset;
		
		delete place._id;

		place.name = place.name+'(copy)';

		var newId = Places.insert(place);
		
		console.log('clonePlace', placeId, place.name);

		return newId;
	},
	renamePlace: function(placeId, name) {
		
		if(!K.admin.isMe()) return null;

		var iname = K.util.sanitizeName(name);

		Places.update(placeId, {$set: {name: iname} });
		
		console.log('renamePlace', placeId, name);
	},
	movePlace: function(placeId, loc) {

		if(!K.admin.isMe()) return null;

		//updatePlaceLoc(placeId, loc );
		Places.update(placeId, {$set: {loc: loc} });

		console.log('movePlace', placeId, loc);
	}
});
