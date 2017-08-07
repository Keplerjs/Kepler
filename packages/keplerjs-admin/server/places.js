
K.Admin.methods({
	removePlace: function(placeId) {

		if(!K.Admin.isMe()) return null;

		Places.remove(placeId);

		console.log('Admin: removePlace', placeId);		
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

		Users.update(true, {$set: {hist: []} }, { multi: true });
		Places.update(true, {$set: {hist: []} }, { multi: true });
	},	
	cleanAllCheckins: function() {
		
		if(!K.Admin.isMe()) return null;

		Users.update(true, {$set: {checkin: null} }, { multi: true });
		Places.update(true, {$set: {checkins: []} }, { multi: true });
	}
});
