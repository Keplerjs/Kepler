
K.admin.addMethods({
	cleanPlaceHist: function(placeName) {
		
		if(!K.admin.isMe()) return null;

		var placeData = Places.findOne({name: placeName}),
			placeId = placeData._id;

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

		Users.update({_id: {$in: placeData.checkins }}, {$set: {checkin: null} });
		Places.update(placeId, {
			$set: {
				checkins: []
			}
		});
	},
	cleanAllHist: function() {
		
		if(!K.admin.isMe()) return null;

		Users.update({}, {$set: {hist: []} });
		Places.update({}, {$set: {hist: []} });
	},	
	cleanAllCheckins: function() {
		
		if(!K.admin.isMe()) return null;

		Users.update({}, {$set: {checkin: null} });
		Places.update({}, {$set: {checkins: []} });
	},
	cleanAllFavorites: function() {
		
		if(!K.admin.isMe()) return null;

		Users.update({}, {$set: {favorites: []} });
		Places.update({}, {$set: {rank: 0} });
	},
	delPlace: function(placeId) {

		if(!K.admin.isMe()) return null;

		Places.remove({_id: new Mongo.Collection.ObjectID(placeId) });
	},
	clonePlace: function(placeId) {

		if(!K.admin.isMe()) return null;

		var place = getPlaceById(placeId).fetch()[0],
			offset = 0.01;

		place.loc[0] += offset;
		place.loc[1] += offset;
		
		place.name = place.name+'(copy)';

		var newId = Places.insert(place);

		return newId._str;
	},
	renamePlace: function(placeId, name) {
		
		if(!K.admin.isMe()) return null;

		var iname = K.util.sanitizeFilename(name);

		Places.update(placeId, {$set: {name: iname} });
	},
	movePlace: function(placeId, loc) {

		if(!K.admin.isMe()) return null;

		updatePlaceLoc(placeId, loc);
	}
});
