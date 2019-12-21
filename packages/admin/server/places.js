
K.Admin.methods({
	removePlace: function(placeId) {

		if(!K.Admin.isMe()) return null;

		if(_.isString(placeId)) {

			Places.remove({_id: placeId});
			Users.update({
				places: placeId
			}, {
				$pull: {
					places: placeId
				}
			},{multi:true});
			console.log('Admin: removePlace', placeId);
		}
	},
	removeAllPlaces: function() {

		if(!K.Admin.isMe()) return null;
		
		Places.remove({});
		
		console.log('Admin: removeAllPlaces');
	},	
	updatePlace: function(placeId, data) {
		
		if(!K.Admin.isMe()) return null;
		
		delete data._id;

		Places.update(placeId, {
			$set: data
		});

		console.log('Admin: updatePlace', placeId);	
	},
	updatePlaceOwner: function(placeId, userName) {
		
		if(!K.Admin.isMe() || !userName || !placeId) return null;

		var placeData = Places.findOne(placeId),
			userData = Users.findOne({username: userName});

		if(placeData && userData) {

			Places.update(placeData._id, {
				$set: {
					userId: userData._id
				}
			});
			//TODO owner instead of replace
			Users.update(placeData.userId, {
				$pull: {
					places: placeData._id
				}
			});
			Users.update(userData._id, {
				$addToSet: {
					places: placeData._id
				}
			});

			console.log('Admin: updatePlaceOwner', placeId, userName);
		}
	},	
	movePlace: function(placeId, loc) {

		if(!K.Admin.isMe()) return null;

		Places.update(placeId, {
			$set: {loc: loc}
		});

		console.log('Admin: movePlace', placeId, loc);
	},	
	cleanPlaceHist: function(placeName) {
		
		if(!K.Admin.isMe()) return null;

		var placeData = Places.findOne({name: placeName}),
			placeId = placeData._id;

		if(placeData && placeData.hist)
			Users.update({_id: {$in: placeData.hist }}, {
				$pull: {
					hist: placeId
				}
			},{ multi: true });
		
		Places.update(placeId, {
			$set: {
				hist: []
			}
		});

		console.log('Admin: cleanPlaceHist', placeName);
		return 'cleaned'
	},
	cleanPlaceCheckins: function(placeName) {
		
		if(!K.Admin.isMe()) return null;

		var placeData = Places.findOne({name: placeName}),
			placeId = placeData._id;

		if(placeData.checkins) {
			Users.update({_id: {$in: placeData.checkins }}, {
				$set: {
					checkin: null
				}
			},{ multi: true });
		}

		Places.update(placeId, {
			$set: {
				checkins: []
			}
		});

		console.log('Admin: cleanPlaceCheckins', placeName);
	},
	cleanAllHist: function() {
		
		if(!K.Admin.isMe()) return null;

		Users.update({}, {$set: {hist: []} }, { multi: true });
		Places.update({}, {$set: {hist: []} }, { multi: true });

		console.log('Admin: cleanAllHist');
	},	
	cleanAllCheckins: function() {
		
		if(!K.Admin.isMe()) return null;

		Users.update({}, {$set: {checkin: null} }, { multi: true });
		Places.update({}, {$set: {checkins: []} }, { multi: true });

		console.log('Admin: cleanAllCheckins');
	},
	sanitizePlaces: function(field, func) {

		if(!K.Admin.isMe() || !field || !K.Util.sanitize[func] ) return null;

		var filter = {},
			count = 0
		
		filter[field]= {'$exists':true, '$ne':null, '$ne': ''};

		Places.find(filter).forEach(function(place) {
			
			var set = {};
			
			set[field] = K.Util.sanitize[func]( K.Util.getPath(place,field) );

			count += Places.update(place._id, {
				$set: set
			});

		});

		console.log('Admin: sanitizePlacesField', field, func, count);
	},
	normalizePlaces: function() {

		if(!K.Admin.isMe()) return null;

		var count = 0
		
		Places.find({}).forEach(function(place) {
			
			var set = {};
			console.log("\n------------------------\n");
			console.log(place);
			console.log("\n-----\n");
			var newPlace = _.deepExtend({}, K.schemas.place, place);
			console.log(newPlace);


			//var placeId = Places.update(place._id);
			/*count += Places.update(place._id, {
				$set: set
			});*/

			count++;
		});

		console.log('Admin: normalizePlaces', count);
	}
});
