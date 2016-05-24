
K.admin.methods({
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
	updatePlaceLoc: function(placeId, loc)	{
		
		if(!K.admin.isMe()) return null;
		
		async.parallel({
			loc: function(cb) {
				Meteor.setTimeout(function() {
					cb(null, loc);
				},0);
			},
			esp: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoapi.aspect(loc) );
			 	},0);
			},
			ele: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoapi.elevation(loc) );
			 	},0);
			},
			near: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoapi.near(loc) );
			 	},0);
			},
			com: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoapi.municipality(loc) );
			 	},0);
			},
			prov: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoapi.province(loc) );
			 	},0);
			},
			reg: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoapi.region(loc) );
			 	},0);
			}
			//TODO
			//tracks e pois
		},
		function(err, results) {
			Places.update(placeId, {
				$set: results
			});
			console.log('aupdatePlaceLoc',results);
		});

		//TODO blocca se non e' admin
		//http://stackoverflow.com/questions/12569712/meteor-calling-an-asynchronous-function-inside-a-meteor-method-and-returning-th
		//TODO usare Fiber e Future...	
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
		
		place._id = new Mongo.Collection.ObjectID();
		place.name = place.name+'(copy)';

		var newId = Places.insert(place);

		return newId._str;
	},
	renamePlace: function(placeId, name) {
		
		if(!K.admin.isMe()) return null;

		Places.update({_id: new Mongo.Collection.ObjectID(placeId) }, {$set: {name: name} });
	}
});
