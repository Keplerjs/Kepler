
K.Admin.methods({
	insertPlace: function(loc) {

		if(!K.Admin.isMe()) return null;

		loc = K.Util.geo.roundLoc(loc);

		//TODO don't create places too nearby

		var place = _.deepExtend(K.schemas.place, {
			name: 'new '+K.Util.humanize.loc(loc),
			loc: loc,
			active: 0
		});

		var placeId = Places.insert(place);
		
		console.log('Admin: insertPlace', placeId, place.name);

		return placeId;
	},
	removePlace: function(placeId) {

		if(!K.Admin.isMe()) return null;

		Places.remove(placeId);
	},
	clonePlace: function(placeId) {

		if(!K.Admin.isMe()) return null;

		var place = K.findPlaceById(placeId).fetch()[0],
			offset = 0.02;

		place.loc[0] += offset;
		place.loc[1] += offset;
		
		delete place._id;

		place.name = '(copy)'+place.name;

		place = _.deepExtend(K.schemas.place, place);

		var newId = Places.insert(place);
		
		console.log('Admin: clonePlace', placeId, place.name);

		return newId;
	},
	renamePlace: function(placeId, name) {
		
		if(!K.Admin.isMe()) return null;

		var iname = K.Util.sanitizeName(name);

		Places.update(placeId, {$set: {name: iname} });
		
		console.log('Admin: renamePlace', placeId, name);
	},
	movePlace: function(placeId, loc) {

		if(!K.Admin.isMe()) return null;

		Places.update(placeId, {$set: {loc: loc} });

		console.log('Admin: movePlace', placeId, loc);
	},	
	cleanPlaceHist: function(placeName) {
		
		if(!K.Admin.isMe()) return null;

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
		
		if(!K.Admin.isMe()) return null;

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
		
		if(!K.Admin.isMe()) return null;

		Users.update(true, {$set: {hist: []} });
		Places.update(true, {$set: {hist: []} });
	},	
	cleanAllCheckins: function() {
		
		if(!K.Admin.isMe()) return null;

		Users.update(true, {$set: {checkin: null} });
		Places.update(true, {$set: {checkins: []} });
	},
	cleanAllFavorites: function() {
		
		if(!K.Admin.isMe()) return null;

		Users.update(true, {$set: {favorites: []} });
		Places.update(true, {$set: {rank: 0} });
	}
});
